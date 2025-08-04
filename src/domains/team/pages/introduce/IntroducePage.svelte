<script lang="ts">
    import logoUrl from '../../../../lib/assets/eddi.webp';

    const teamMembers = [
        {
            name: '이상훈',
            role: 'CEO',
            img: logoUrl,
            question: '취미가 뭐예요?',
            answer: '게임과 새로운 기술 트렌드를 탐구하며, 팀과 함께 성장하는 시간을 즐깁니다.',
        },
        {
            name: '김은혜',
            role: '서버 개발자',
            img: logoUrl,
            question: '일 외에 어떻게 휴식하나요?',
            answer: '좋아하는 음악을 들으며 코드를 짜고, 주말에는 등산이나 책 읽기로 재충전합니다.',
        },
        {
            name: '이재림',
            role: '수석 디자이너, 풀스택',
            img: logoUrl,
            question: '창의력은 어떻게 얻나요?',
            answer: '여행과 다양한 예술 작품에서 영감을 얻으며, 팀원들과 아이디어를 나누는 걸 좋아합니다.',
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
