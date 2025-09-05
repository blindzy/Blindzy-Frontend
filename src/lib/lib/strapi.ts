import axios from 'axios';

const strapiUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

export async function fetchBlogs() {
    const response = await axios.get(`http://localhost:1337/api/blogs?populate=*`, {
        headers: {
            Authorization: `Bearer a7667e2b4b44ccf4ec99c2ade74a5731a3cbaf87a4e2288c7cc92a0cdfd6b4e07937395475b16382e03e48869369802d800862fca5f23077016f36d1b8b35c68660bb5e00c8356eda18dffac87a645844c69635d1f21e266777e895046dee16c2293b7ff528cb2eff39a98ad3b0fc61250a9106f5e23beb4271fabd292769390`
        }
    })
    const { data } = response;
    return data;
}