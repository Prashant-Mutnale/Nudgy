import { StyleSheet,Platform,Dimensions } from 'react-native';
import Recent from '../styles/Recent/recent.style'
import writeReview from '../styles/writeReview/write.style'

import reviewstatus from '../styles/ReviewStatus/reviewstatus.style'

import shoutOut from '../../shout/shoutOutstyle'


export default StyleSheet.create({
    ...shoutOut,
    ...Recent,
    ...reviewstatus,
    ...writeReview
    
})

