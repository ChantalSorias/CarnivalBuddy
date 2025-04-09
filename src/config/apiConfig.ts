const dev = {
    baseURL: 'http://localhost:5068/api',
};

const prod = {
    baseURL: 'https://your-production-url.com/api',
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
