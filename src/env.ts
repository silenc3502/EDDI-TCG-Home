const env = {
    mode: import.meta.env.MODE,
    api: {
        MAIN_API_URL: import.meta.env.VITE_MAIN_API_URL || 'http://localhost:8080',

        kakao: import.meta.env.VITE_KAKAO_AUTH_URL,
        google: import.meta.env.VITE_GOOGLE_AUTH_URL,
        naver: import.meta.env.VITE_NAVER_AUTH_URL,
        github: import.meta.env.VITE_GITHUB_AUTH_URL,
        meta: import.meta.env.VITE_META_AUTH_URL
    }
}

export default env