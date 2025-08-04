<script lang="ts">
    import logoUrl from '../../../../lib/assets/eddi.webp';

    const teamMembers = [
        {
            name: '이상훈',
            role: 'CEO',
            img: logoUrl,
            question: '뭐하고 놀아요?',
            answer: '주주들과 한잔하거나 PS5로 보스몹 잡아요. 자전거탄 후 평냉 흡입도 좋아요',
        },
        {
            name: '김은혜',
            role: '서버 개발자',
            img: logoUrl,
            question: '뭐하고 놀아요?',
            answer: '스타워즈 OST 틀어놓고 과자먹으면서 두꺼운 책 읽어요',
        },
        {
            name: '이재림',
            role: '수석 디자이너, 풀스택',
            img: logoUrl,
            question: '뭐하고 놀아요?',
            answer: '스타워즈 OST 틀어놓고 과자먹으면서 두꺼운 책 읽어요',
        }
    ];
</script>

<style>
    .container {
        max-width: 960px;
        margin: 2rem auto;
        padding: 1rem;
    }

    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    @media (min-width: 768px) {
        .team-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .team-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .member-card {
        background: #222831;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        color: white;
        cursor: pointer;
        transition: transform 0.2s ease;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .member-card:hover {
        transform: translateY(-5px);
    }

    .thumb-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 100%; /* 정사각형 유지 */
        background: black;
    }

    .thumb-wrapper img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain; /* 짤림 없이 */
    }

    .content {
        padding: 1rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .name {
        font-size: 1.25rem;
        font-weight: bold;
    }

    .role {
        font-size: 0.9rem;
        color: #9ca3af;
    }

    .question {
        font-weight: 600;
    }

    .answer {
        font-size: 0.9rem;
        line-height: 1.3;
    }
</style>

<div class="container">
    <div class="team-grid">
        {#each teamMembers as member}
            <a
                    href={member.link}
                    class="member-card"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={member.name + ' profile'}
            >
                <div class="thumb-wrapper">
                    <img src={member.img} alt={'Photo of ' + member.name} loading="lazy" />
                </div>
                <div class="content">
                    <div class="name">{member.name}</div>
                    <div class="role">{member.role}</div>
                    <div class="question">Q: {member.question}</div>
                    <div class="answer">A: {member.answer}</div>
                </div>
            </a>
        {/each}
    </div>
</div>
