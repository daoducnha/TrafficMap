import {connect} from 'react-redux';
import Home from './Home';
import { fetchAPIStart, fetchFromAPI } from './store/actions/api_action';

const mapStateToProps = state => {
    return {
        API: state.APIReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        startFetch: () => dispatch(fetchFromAPI())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);