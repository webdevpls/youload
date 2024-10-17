/** @type {import('next').NextConfig} */
const nextConfig = {

  async headers() {
    return [
      {
        source: '/api/route/:path*', // Permite todas as sub-rotas de /api/route
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Ou a origem específica do seu frontend
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
    

};



export default nextConfig;
