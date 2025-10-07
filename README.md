# LinkChop

LinkChop is a versatile URL shortener application designed to simplify the process of sharing long URLs by generating concise and memorable shortened links. With both limited and premium features, LinkChop caters to a wide range of users, offering an intuitive interface and robust functionality.

## Product Status:
[![Website](https://img.shields.io/endpoint?style=for-the-badge&url=https://linkchop.com/api/linkchop-uptime/1788348?label=website&down_message=offline&up_message=online)](https://status.linkchop.com/)
[![API](https://img.shields.io/endpoint?style=for-the-badge&url=https://linkchop.com/api/linkchop-uptime/1788458?label=API&down_message=offline&up_message=online)](https://status.linkchop.com/)
[![Database](https://img.shields.io/endpoint?style=for-the-badge&url=https://linkchop.com/api/linkchop-uptime/1788511?label=Database&down_message=offline&up_message=online)](https://status.linkchop.com/)

## Technologies Used

[![React](https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Next JS](https://img.shields.io/badge/Next-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth-000000?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPG1hc2sgaWQ9Im1hc2swXzE1Nl8yNTIiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjMiIHk9IjIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNiI+CiAgICA8cGF0aCBkPSJNMy43MTg3NSAzLjkyOTcyQzUuNjI3ODkgMy4zNjczMyA4LjQ1NTY4IDIuNTI0MTEgOS42NDgyOCAyLjE2ODEyQzEwLjAxNzMgMi4wNTc5NyAxMC40MDc1IDIuMDU3MTEgMTAuNzc3MSAyLjE2NTMzQzExLjkyNiAyLjUwMTczIDE0LjU5ODQgMy4yODc4MyAxNi42NjQ4IDMuOTIzNDlDMTcuMDgyOCA0LjA1MjA5IDE3LjM2NzkgNC40NDU5MyAxNy4zNTc1IDQuODgzMTlDMTcuMTE4OCAxNC45ODY3IDEyLjAxOTYgMTcuNDEwNSAxMC41ODQyIDE3Ljg5MzZDMTAuMzM4OCAxNy45NzYyIDEwLjA4MzcgMTcuOTc2NCA5LjgzODAyIDE3Ljg5NDVDOC4zOTU2NyAxNy40MTM3IDMuMjU0MjEgMTQuOTk1MSAzLjAwOTA3IDQuODk3MTRDMi45OTgzIDQuNDUzMTcgMy4yOTI3NiA0LjA1NTIxIDMuNzE4NzUgMy45Mjk3MloiIGZpbGw9IiNEOUQ5RDkiLz4KICA8L21hc2s+CiAgPHBhdGggZD0iTTMuNzE4NzUgMy45Mjk3MkM1LjYyNzg5IDMuMzY3MzMgOC40NTU2OCAyLjUyNDExIDkuNjQ4MjggMi4xNjgxMkMxMC4wMTczIDIuMDU3OTcgMTAuNDA3NSAyLjA1NzExIDEwLjc3NzEgMi4xNjUzM0MxMS45MjYgMi41MDE3MyAxNC41OTg0IDMuMjg3ODMgMTYuNjY0OCAzLjkyMzQ5QzE3LjA4MjggNC4wNTIwOSAxNy4zNjc5IDQuNDQ1OTMgMTcuMzU3NSA0Ljg4MzE5QzE3LjExODggMTQuOTg2NyAxMi4wMTk2IDE3LjQxMDUgMTAuNTg0MiAxNy44OTM2QzEwLjMzODggMTcuOTc2MiAxMC4wODM3IDE3Ljk3NjQgOS44MzgwMiAxNy44OTQ1QzguMzk1NjcgMTcuNDEzNyAzLjI1NDIxIDE0Ljk5NTEgMy4wMDkwNyA0Ljg5NzE0QzIuOTk4MyA0LjQ1MzE3IDMuMjkyNzYgNC4wNTUyMSAzLjcxODc1IDMuOTI5NzJaIiBzdHlsZT0iZmlsbDogcmdiKDAsIDAsIDApOyIvPgogIDxnIG1hc2s9InVybCgjbWFzazBfMTU2XzI1MikiPgogICAgPHBhdGggZD0iTSAxMC41ODIgOS42MDcgTCAxMC40NzkgMS43NjYgTCAxNy41MDggMy43OTUgTCAxMC41ODIgOS42MDcgWiIgc3R5bGU9InRyYW5zZm9ybS1vcmlnaW46IDEzLjk5M3B4IDUuNjg3cHg7IGZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk5OTc2LCAwLjAwNjk0NSwgLTAuMDA2OTQ1LCAwLjk5OTk3NiwgMCwgMCkiLz4KICAgIDxwYXRoIGQ9Ik0gOS45NjcgMTAuMDY5IEwgOS45NjcgMS44MTcgTCAyLjUyOSAzLjkxIEwgMS41MDcgOC45OTMgTCA0Ljc0NCAxNC4zMTUgTCA5Ljk2NyAxMC4wNjkgWiIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz4KICAgIDxwYXRoIGQ9Ik0gMTAuMDI0IDEwLjg3MyBMIDUuMTE5IDE0Ljc0MiBMIDUuMjQ1IDE3LjE1NiBMIDEwLjAwOSAxOC45MTUgTCAxMC4wMjQgMTAuODczIFoiIHN0eWxlPSJ0cmFuc2Zvcm0tb3JpZ2luOiA3LjYzNHB4IDE0LjAxNHB4OyBmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+CiAgICA8cGF0aCBkPSJNIDMyLjkwMyAtOC4yMiBMIDEwLjU5NCAxMC4zNzcgTCAxMC41OTQgMTguMTI1IEwgMzEuMDEgMTguMTI1IEwgMzIuOTAzIC04LjIyIFoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+CiAgPC9nPgo8L3N2Zz4=)](https://next-auth.js.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-000000?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-000000?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Zoho](https://img.shields.io/badge/Zoho-000000?style=for-the-badge&logo=zoho&logoColor=white)](https://zoho.com/)
[![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)

## Installation

To run LinkChop locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/linkchop.git
   ```

2. Navigate to the project directory:

   ```bash
   cd linkchop
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file. As
   - Add all env variables from your vercel postgres db

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and visit `http://localhost:3000` to access LinkChop.

## Usage

- Sign in or create an account to access the full functionality of LinkChop.
- Shorten URLs with ease and share them effortlessly with others.
- Explore limited and premium features tailored to your needs.

## Emails

| Email                 | Provider | Limit                                   |
|-----------------------|----------|-----------------------------------------|
| no-reply@linkchop.com | Resend   | 100 emails a day / 3,000 emails a month |
| colin@linkchop.com    | Zoho     | 5GB/User, 25MB attachment limit         |

## Contact

For inquiries or support regarding LinkChop, please contact [colin@linkchop.com](mailto:colin@linkchop.com).