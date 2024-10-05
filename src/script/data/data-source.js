import axios from 'axios';

const baseUrl = 'https://islamic-api-zhirrr.vercel.app/api/doaharian';

class DataSource {
  static getDoa() {
    return axios
      .get(baseUrl)
      .then((response) => {
        if (response) {
          return Promise.resolve(response.data.data);
        }
        return Promise.reject(new Error(
          'Oops, something went wrong while fetching data.',
        ));
      })
      .catch((error) => Promise.reject(new Error(
        `Oops, something went wrong: ${error.message || error}.`,
      )));
  }
}

export default DataSource;
