let opt = {};
let ingress = process.env.API_INGRESS || 'http://localhost:3000'

opt.NODE_ENV = '"production"';
opt.API_INGRESS = JSON.stringify(ingress);

module.exports = opt;
