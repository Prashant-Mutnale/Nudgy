import React from 'react';
import {
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
    AsyncStorage,
    Keyboard
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles/style'
import colors from '../Elements/colors'
import StarRating from 'react-native-star-rating';
import ButtonComman from '../Elements/ButtonComman'
import { connect } from 'react-redux'
import { writereview } from '../../redux/actions/Writereview'
import { reviewstatus } from '../../redux/actions/Reviewstatus'
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let gettoken
let Arrayid
let joinId
class WriteReviews extends React.Component {
    constructor(props) {
        super(props)
        this.inputRefs = {};
        this.state = {
            starCount: 2,
            behaviourcount: 0,
            communicationcount: 0,
            depenadablitycount: 0,
            skillcount: 0,
            reviewtext: '',
            favColor: undefined,
        }
        this.submitreviews = this.submitreviews.bind(this)
        this.behaviourcountrating = this.behaviourcountrating.bind(this)
        this.skillcountrating = this.skillcountrating.bind(this)
        this.communicationrating = this.communicationrating.bind(this)
        this.depenadablityrating = this.depenadablityrating.bind(this)
        this.reviewtext = this.reviewtext.bind(this)
    }

    async componentDidMount() {
        console.log("projectid", this.props.projectid)
        console.log("userid", this.props.userid)
        console.log("name", this.props.usernamedata)
        console.log("name", this.props.projectname)
        console.log("profilepick", this.props.profilePic)
        const signindetails = await AsyncStorage.getItem("signindata")
        let parsedata = JSON.parse(signindetails)
        gettoken = parsedata.accessToken
    }
    capitalize(text) {
        return text.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
    }
    submitreviews() {
        console.log("eachcount", this.state.behaviourcount)
        let StringReviews = {
            behavior: this.state.behaviourcount,
            skillLevel: this.state.skillcount,
            communication: this.state.communicationcount,
            dependability: this.state.depenadablitycount
        }
        let reviewsubmit = {
            reviewMessage: this.state.reviewtext,
            employeeRating: {
                "behavior": this.state.behaviourcount.toString(),
                "skillLevel": this.state.skillcount.toString(),
                "communication": this.state.communicationcount.toString(),
                "dependability": this.state.depenadablitycount.toString()
            },
            projectId: this.props.projectid,
            reviewTo: this.props.userid,
            type: 'review'
        }
        this.props.projectiddata !== "" && this.props.projectiddata != undefined ?
            Arrayid = this.props.projectiddata.project.map(function (itemsid, id) {
                // console.log("itemsid", itemsid)
                return itemsid.id
            }).join("&")
            : null
        console.log("Arrayid", Arrayid)
        joinId = Arrayid
        console.log("gettoken", gettoken)
        console.log("joinId", joinId)
        this.props.writereview(gettoken, reviewsubmit)
        this.props.reviewstatus(gettoken, joinId, "writereview")
        // Actions.ReviewStatus()
        // Actions.ReviewStatus({ type: 'replace' });
        // Actions.pop(); Actions.refresh({ ReviewStatus })
        // Toast.show('Thanks for the review', );
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
    }
    behaviourcountrating(rating) {
        console.log("rating", rating)
        this.setState({
            behaviourcount: rating
        })
    }
    skillcountrating(rating) {
        console.log("skillrating", rating)
        this.setState({
            skillcount: rating
        })
    }
    communicationrating(rating) {
        console.log("communicationrating", rating)
        this.setState({
            communicationcount: rating
        })
    }
    depenadablityrating(rating) {
        console.log("depenadablityrating", rating)
        this.setState({
            depenadablitycount: rating
        })
    }
    reviewtext(textreview) {
        console.log("reviewtext", textreview)
        this.setState({
            reviewtext: textreview
        })
    }
    render() {
        return (
            <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps={'always'} style={styles.containerstylenew}>
                <KeyboardAwareScrollView
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps={"always"}
                >
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <View style={styles.writeReview}>
                        <View style={styles.writeReviewHeader}>
                            <View style={styles.writeReviewImagesView}>

                                <Image
                                    style={styles.writeReviewImage}
                                    source={require('../../images/Oval.png')}
                                    source={{ uri: this.props.profilePic !== "" ? this.props.profilePic : 'https://cdn.pbrd.co/images/HOYTMfd.png' }}
                                />

                            </View>
                            <View style={styles.writeReviewHeaderPart2}>
                                <View style={styles.writeReviewHeaderPart2Heading}>
                                    {<Text style={styles.writeReviewHeaderTitle1}>{this.capitalize(this.props.usernamedata)}</Text>}
                                    {/* <Text style={styles.writeReviewHeaderTitle1}>{this.props.usernamedata.charAt(0).toUpperCase() + this.props.usernamedata.slice(1)}</Text> */}
                                    <Text style={styles.writeReviewHeaderTitle2}>Project : {this.props.projectname}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.writeReviewRating}>
                            {/* <View style={styles.writeReviewRatingHeading}>
                            <Text style={styles.writeReviewRatingHeadingRate}>Rate your colleague</Text>
                        </View> */}
                            <View style={styles.writeReviewRatingSection}>
                                <View style={styles.writeReviewRatingSectiontitle}>
                                    <View style={styles.writeReviewRatingSectionRatingTitle}>
                                        <Text style={styles.writeReviewRatingSectionRatingTitleWord}>Behavior</Text>
                                    </View>
                                    <View style={styles.writeReviewRatingSectionRating}>
                                        <StarRating
                                            fullStarColor={this.state.behaviourcount == 1 ? 'red' : this.state.behaviourcount == 2 ? '#FFCD83' : this.state.behaviourcount == 3 ? '#FFEB4E' : this.state.behaviourcount == 4 ? '#CDEB76' : '#2AF98A'}
                                            maxStars={5}
                                            starSize={20}
                                            emptyStar={'star'}
                                            emptyStarColor={'#e9e9e9'}
                                            rating={this.state.behaviourcount}
                                            selectedStar={(rating) => this.behaviourcountrating(rating)}
                                        />
                                    </View>
                                    <View style={styles.number}>
                                        <Text style={styles.numberText}>{this.state.behaviourcount}</Text>
                                    </View>
                                </View>

                                <View style={styles.writeReviewRatingSectiontitle}>
                                    <View style={styles.writeReviewRatingSectionRatingTitle}>
                                        <Text style={styles.writeReviewRatingSectionRatingTitleWord}>Skill Level</Text>
                                    </View>
                                    <View style={styles.writeReviewRatingSectionRating}>
                                        <StarRating
                                            fullStarColor={this.state.skillcount == 1 ? 'red' : this.state.skillcount == 2 ? '#FFCD83' : this.state.skillcount == 3 ? '#FFEB4E' : this.state.skillcount == 4 ? '#CDEB76' : '#2AF98A'}
                                            maxStars={5}
                                            starSize={20}
                                            emptyStar={'star'}
                                            emptyStarColor={'#e9e9e9'}
                                            rating={this.state.skillcount}
                                            selectedStar={(rating) => this.skillcountrating(rating)}
                                        />
                                    </View>
                                    <View style={styles.number}>
                                        <Text style={styles.numberText}>{this.state.skillcount}</Text>
                                    </View>
                                </View>

                                <View style={styles.writeReviewRatingSectiontitle}>
                                    <View style={styles.writeReviewRatingSectionRatingTitle}>
                                        <Text style={styles.writeReviewRatingSectionRatingTitleWord}>Analytical</Text>
                                    </View>
                                    <View style={styles.writeReviewRatingSectionRating}>
                                        <StarRating
                                            fullStarColor={this.state.communicationcount == 1 ? 'red' : this.state.communicationcount == 2 ? '#FFCD83' : this.state.communicationcount == 3 ? '#FFEB4E' : this.state.communicationcount == 4 ? '#CDEB76' : '#2AF98A'}
                                            maxStars={5}
                                            starSize={20}
                                            emptyStar={'star'}
                                            emptyStarColor={'#e9e9e9'}
                                            rating={this.state.communicationcount}
                                            selectedStar={(rating) => this.communicationrating(rating)}
                                        />
                                    </View>
                                    <View style={styles.number}>
                                        <Text style={styles.numberText}>{this.state.communicationcount}</Text>
                                    </View>
                                </View>

                                <View style={styles.writeReviewRatingSectiontitle}>
                                    <View style={styles.writeReviewRatingSectionRatingTitle}>
                                        <Text style={styles.writeReviewRatingSectionRatingTitleWord}>Dependability</Text>
                                    </View>
                                    <View style={styles.writeReviewRatingSectionRating}>
                                        <StarRating
                                            // starStyle={{ marginRight: 5 }}
                                            fullStarColor={this.state.depenadablitycount == 1 ? 'red' : this.state.depenadablitycount == 2 ? '#FFCD83' : this.state.depenadablitycount == 3 ? '#FFEB4E' : this.state.depenadablitycount == 4 ? '#CDEB76' : '#2AF98A'}
                                            maxStars={5}
                                            starSize={20}
                                            emptyStar={'star'}
                                            emptyStarColor={'#e9e9e9'}
                                            rating={this.state.depenadablitycount}
                                            selectedStar={(rating) => this.depenadablityrating(rating)}
                                        />
                                    </View>
                                    <View style={styles.number}>
                                        <Text style={styles.numberText}>{this.state.depenadablitycount}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.writeReviewWriteSection}>
                            {/* <View style={styles.writeReviewWriteHeading}>
                            <Text style={styles.writeReviewRatingRateHeadingRate}>WRITE REVIEW</Text>
                        </View> */}
                            <View style={styles.writeReviewWriteSectionText}>
                                <View style={styles.subViewInputText}>
                                    <TextInput style={styles.writeReviewWriteSectionTextInput} multiline={true} onChangeText={(text) => this.reviewtext(text)} value={this.state.reviewtext} placeholder={'Write here…'} placeholderTextColor={'#A09999'} />
                                </View>
                            </View>
                            <View style={styles.anonymousRatingHolder}>
                                <Text style={styles.anonymousRating}>All ratings are anonymous</Text>
                            </View>
                        </View>

                        <View style={styles.writeReviewButtonSection}>
                            <TouchableOpacity disabled={this.state.behaviourcount > 0 && this.state.communicationcount > 0 && this.state.depenadablitycount > 0 && this.state.skillcount > 0 && this.state.reviewtext !== "" ? false : true} style={this.state.behaviourcount > 0 && this.state.communicationcount > 0 && this.state.depenadablitycount > 0 && this.state.skillcount > 0 && this.state.reviewtext !== "" ? [ButtonComman.button] : [ButtonComman.DisabledButton, styles.mgtop20]} onPress={() => this.submitreviews()}><Text style={styles.buttonText}>SUBMIT</Text></TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        )
    }

}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderBottomColor: colors.LightGrey,
        borderColor: '#fff',
        // borderColor: '#fff',
        // borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});
function mapStateToProps(state) {
    console.log(state)
    return {
        writereviewdata: state,
        projectiddata: state.projectiddata.projectiddata.employeeProject
    }
}

export default connect(mapStateToProps, { writereview, reviewstatus })(WriteReviews);

