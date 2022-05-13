import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const DASHBOARD_API_BASE_URL = "/api/dashboard"; 

class DashboardService{

    // eslint-disable-next-line class-methods-use-this
    getRecommendMedi(id) {
        console.log('getRecommendMedi')
        return axios.post(`${DASHBOARD_API_BASE_URL}/recommendMedi?id=${id}`,  { headers: authHeader() });
    }
}
export default new DashboardService();