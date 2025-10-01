// import type { APIRoute } from "astro";
// import signup from "../../utils/signup";

// export const POST: APIRoute = async ({ request }) => {
//   try {
//     const body = await request.json();
//     console.log('API signup called with:', body);
    
//     // Call the signup utility function
//     const data = await signup(body);
//     console.log('Signup response:', data);

//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error: any) {
//     console.error('Signup API error:', error);
    
//     return new Response(JSON.stringify({ 
//       message: error.message || "Registration failed",
//       error: error.toString()
//     }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// };
