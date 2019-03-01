
import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import { MyReviewsAll, Projectid, HrRatingAll, BASEURL } from '../constant'
import { AsyncStorage } from 'react-native';
import Store from '../../storage'


export const myreviewsAll = (gettoken, getuserid, getmonth) => dispatch => {
	console.log("getuserid", getuserid)
	console.log("gettoken", gettoken)
	console.log("getmonth", getmonth)
	console.log("url", 'http://13.127.236.123:1337/reviews/' + getuserid + "/" + getmonth)
	fetch(BASEURL + '/reviews/' + getuserid + "/" + getmonth, {
		headers: {
			'authorization': gettoken,
			'Accept': 'application/json',
		},
	})
		.then(res => res.json())

		.then(data => dispatch({
			type: MyReviewsAll,
			payload: data
		}))
}

export const getProjectid = (gettoken) => dispatch => {
	fetch(BASEURL + '/employees', {
		headers: {
			'authorization': gettoken,
			'Accept': 'application/json',
		},
	})
		.then(res => res.json())

		.then(data => dispatch({
			type: Projectid,
			payload: data
		}))
}

export const hrRatingAll = (gettoken, getuserid, getmonth) => dispatch => {
	console.log("getuserid", getuserid)
	console.log("getmonth", getmonth)
	fetch(BASEURL + '/admin/review/' + getuserid + "/" + getmonth, {
		headers: {
			'authorization': gettoken,
			'Accept': 'application/json',
		},
	})
		.then(res => res.json())
		.then(data => dispatch({
			type: HrRatingAll,
			payload: data
		}))
}



export const emptydataReviews = () => dispatch => {
	console.log("emptydata")
	console.log("celld")
	dispatch({
		type: MyReviewsAll,
		payload: ""
	})
}