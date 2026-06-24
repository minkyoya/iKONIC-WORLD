/*
    AI-assisted feature note:
    D-Day, 아코디언, 모달, 슬라이더, 댓글, 게시판, 캘린더 같은 기능 구현 예시를
    찾아보고 일부 초안을 작성한 뒤, 현재 HTML 구조와 템플릿 흐름에 맞게 직접 병합 및 수정했다.
*/

document.addEventListener("DOMContentLoaded", () => {
    const topbar = document.getElementById("topbar");

    // --- 1. 실시간 D-Day 계산 로직 ---
    const debutDate = new Date("2015-09-15T00:00:00");
    const today = new Date();
    const diffTime = Math.abs(today - debutDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const ddayElement = document.getElementById("debutDday");
    if (ddayElement) ddayElement.textContent = `아이콘 데뷔 +${diffDays}일 ❤️`;

    const boardDisplayNames = {
        goods: "굿즈 게시판",
        free: "팬 자유게시판"
    };

    const defaultReactionData = [
        [
            { name: "열정코닉", text: "무대가 정말 인상적이었어요. 바비 딕션 미쳤다 ㅠㅠ" },
            { name: "뿌요바라기", text: "다시 보고 싶은 레전드 영상!! 하루에 10번씩 봅니다." }
        ],
        [
            { name: "찬우살이", text: "방송 분위기가 너무 편하고 애들 비글미 터져서 계속 보게 돼요 ㅋㅋㅋ" },
            { name: "송쉪", text: "디스코팡팡 타는 거 진짜 배꼽 빠짐 ㅋㅋㅋㅋㅋ" }
        ],
        [
            { name: "동댕이", text: "입덕용으로 이거만한 게 없죠 ㅠㅠ 떼창 들을 때마다 소름 돋음." },
            { name: "구스키앓이", text: "이때 현장에 있었는데 진짜 지붕 날아가는 줄 알았어요." }
        ]
    ];

    // --- 2. 아이코닉 미션 및 콘배트 충전 로직 ---
    const iconicMissions = [
        "오늘 '죽겠다' 스트리밍 3회 하기 🎧",
        "커뮤니티에 멤버 칭찬 한 줄 쓰기 ✍️",
        "오늘 '사랑을 했다' 1일 1회 듣기 🎤",
        "아이콘 공식 인스타 게시물에 좋아요 누르기 ❤️",
        "송슐랭 가이드 영상 하나 시청하기 🍳",
        "준회처럼 하늘 사진 찍고 시 한 줄 써보기 ✍️",
        "바비처럼 푸우 인형 안고 낮잠 자기 🍯",
        "콘배트(응원봉) 건전지 남아있는지 확인하기 🔋",
        "진환이의 '눈 밑 하트 점' 사진 찾아보기 ❤️",
        "주변 지인 1명에게 은근슬쩍 아이콘 노래 추천하기 🎶",
        "최애 멤버 레전드 직캠 1회 시청하며 주접 댓글 달기 📝",
        "오늘 하루 폰 배경화면 아이콘 단체 사진으로 바꾸기 📱"
    ];

    const missionBtn = document.getElementById("missionBtn");
    const missionText = document.getElementById("daily-mission");
    const completeBtn = document.getElementById("completeBtn");

    if (missionBtn && missionText) {
        missionBtn.addEventListener("click", () => {
            const randomIdx = Math.floor(Math.random() * iconicMissions.length);
            missionText.textContent = iconicMissions[randomIdx];
        });
    }

    let fanPower = 36.5;
    if (completeBtn) {
        completeBtn.addEventListener("click", () => {
            fanPower += 5.0; // 미션 완료 시 5%씩 시원하게 차오름
            if (fanPower > 100) fanPower = 100;
            
            const powerText = document.getElementById("fanPowerText");
            const powerFill = document.getElementById("fanPowerFill");
            if(powerText) powerText.textContent = `${fanPower.toFixed(1)}%`;
            if(powerFill) powerFill.style.width = `${fanPower}%`;

            alert("오늘도 훌륭한 아이코닉입니다! ✨ 콘배트 게이지가 5% 충전되었습니다!");
        });
    }

    // --- 3. 입덕 테스트 퀴즈 로직 ---
    window.checkQuiz = (isCorrect) => {
        if (isCorrect) {
            alert("정답입니다! 당신은 찐 아이코닉이군요! ❤️");
        } else {
            alert("삐빅- 입덕 부정기입니다. 지금 바로 '찬우살이' 구독하고 오세요!");
        }
    };

    // --- 4. 포토카드 데이터 ---
    const photocardData = [
        { name: "JAY", image: "https://i.pinimg.com/236x/33/34/6f/33346f796e5534d2f7419031403a0743.jpg", message: "오늘은 '뿌요'의 보이스처럼 감미로운 하루가 될 거예요." },
        { name: "SONG", image: "https://i.pinimg.com/736x/f1/5c/87/f15c871a953b4b753d5f18e3297891fd.jpg", message: "열정!열정! 오늘 메뉴는 윤형이가 추천하는 '송슐랭 가이드' 어떠세요?" },
        { name: "BOBBY", image: "https://pbs.twimg.com/media/Gu-Hog3WsAA5ahu.jpg", message: "오늘 기분 완전 죽겠다! 바비의 스웩을 빌려 드릴게요."},
        { name: "DK",image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F008%2F2025%2F06%2F09%2F0005204751_001_20250609105612948.jpg&type=sc960_832", message: "동혁이의 퍼포먼스처럼 에너지 넘치는 하루가 될 것 같은데요?" },
        { name: "JU-NE",image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F396%2F2018%2F09%2F25%2F0000491122_001_20180925163844809.jpg&type=sc960_832", message: "준회의 독보적인 허스키 보이스가 필요한 날 일 것 같아요." },
        { name: "CHAN",image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5353%2F2017%2F05%2F29%2F0000208290_001_20170529144617525.jpg&type=sc960_832", message: "찬우의 게임 센스처럼 모든 일이 착착 풀리는 날!" }
    ];

    // --- 5. 커뮤니티 데이터 및 댓글 기능 연동 ---
    const defaultBoardPosts = {
        goods: [
            {
                createdAt: "2026.05.03 17:30",
                writer: "뿌요바라기",
                title: "TAKE OFF 앨범 진환 포카 교환 원해요 ㅠㅠ",
                content: "저한테 중복 포카가 너무 많아서요 😭 진환이 포카 있으신 분 중에 동혁이나 찬우 포카 원하시는 분 계실까요? 직거래, 반택 다 환영입니다!!",
                imageData: "https://media.bunjang.co.kr/product/317813042_1_1739685103_w840.jpg?crop=0",
                comments: [{ name: "코닉이", text: "저 찬우 포카 있어요! 🙋‍♀️ 혹시 반택 가능할까요?" }]
            },
            {
                createdAt: "2026.05.03 16:10",
                writer: "콘배트장인",
                title: "드디어 도착한 영롱한 콘배트 실물 영접 ✨",
                content: "예판 때 겨우 성공한 콘배트가 드디어 왔어요! 불빛 켜보니까 진짜 영롱 그 자체 ㅠㅠㅠ 얼른 오프라인 콘서트 가서 흔들고 싶어 죽겠네요 🔥",
                imageData: "https://img.kr.gcp-karroter.net/origin/article/202501/17363677469066655ea019cd59283c2bf3ead9523cc69f4ac31d8208f81757882db01da2a1ea60.jpg?f=webp&q=95&s=1440x1440&service=webapp&t=inside",
                comments: [{ name: "동댕이", text: "와 부러워요 ㅠㅠ 저는 2차 예판 기다리고 있습니다 😭" }]
            },
            {
                createdAt: "2026.05.02 14:20",
                writer: "뿌요뿌요",
                title: "테이크오프 앨범 미개봉 팝니다",
                content: "미개봉 새상품입니다. 직거래 환영해요!",
                imageData: "https://media.bunjang.co.kr/product/395763072_3_1773750856_w360.jpg",
                comments: []
            },
            {
                createdAt: "2026.05.01 19:00",
                writer: "리듬타",
                title: "[교환] iKON 2023 콘서트 엠디 티셔츠 M -> L",
                content: "사이즈 미스로 교환 원합니다. 상태 좋아요!",
                imageData: "https://media.ktown4u.com/products/resize/thumbnail/2023/09/06/pKZVVm.jpg",
                comments: []
            },
            {
                createdAt: "2026.04.30 11:15",
                writer: "동동이최고",
                title: "동혁이 미공포 양도 받습니다 ㅠㅠ",
                content: "동혁이 미공개 포토카드 구합니다. 제시해주세요!",
                imageData: "https://media.bunjang.co.kr/product/408717321_1_1779032183_w180.jpg",
                comments: []
            },
            {
                createdAt: "2026.04.29 09:30",
                writer: "아이코닉",
                title: "RETURN 앨범 풀박스(포카 포함) 판매",
                content: "포카 포함 풀박스입니다. 보관 상태 S급!",
                imageData: "https://media.bunjang.co.kr/product/89222871_1_1560682238_w360.jpg",
                comments: []
            }
        ],
        free: [
            {
                createdAt: "2026.05.03 15:20",
                writer: "팬하루",
                title: "오늘 다시 본 무대 후기",
                content: "라이브 영상 다시 보니까 표정 연기가 더 잘 보여서 좋았어요.",
                comments: []
            },
            {
                createdAt: "2026.05.03 14:05",
                writer: "입덕중",
                title: "추천곡 더 알려주세요",
                content: "LOVE SCENARIO 말고 초보 팬이 듣기 좋은 곡도 궁금해요.",
                comments: [{ name: "송쉪", text: "수록곡 '안아보자'랑 '잊지마요' 꼭 들어보세요!! 강추합니다 👍" }]
            }
        ]
    };

    const cloneDefaultReactionData = (count) =>
        Array.from({ length: count }, (_, index) =>
            (defaultReactionData[index] || []).map((comment) => ({ ...comment }))
        );

    const resetModalAudio = (modal) => {
        modal.querySelectorAll("audio").forEach((audio) => {
            audio.pause();
            try {
                audio.currentTime = 0;
            } catch {
                audio.load();
            }

            const player = audio.nextElementSibling;
            if (!player || !player.classList.contains("custom-audio")) return;

            const toggleButton = player.querySelector(".audio-toggle");
            const progress = player.querySelector(".audio-progress");
            const currentTime = player.querySelector(".audio-time.current");

            if (toggleButton) {
                toggleButton.classList.remove("playing");
                toggleButton.setAttribute("aria-label", "재생");
            }
            if (progress) progress.value = 0;
            if (currentTime) currentTime.textContent = "0:00";
        });
    };

    const setModalOpenState = (modal, isOpen) => {
        if (!modal) return;
        if (!isOpen) resetModalAudio(modal);
        modal.classList.toggle("open", isOpen);
        modal.setAttribute("aria-hidden", isOpen ? "false" : "true");
    };

    const updateTopbarStyle = () => {
        if (topbar) topbar.classList.toggle("scrolled", window.scrollY > 20);
    };

    const setupAccordion = () => {
        document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
            trigger.addEventListener("click", () => {
                const selectedItem = trigger.parentElement;
                document.querySelectorAll(".accordion-item").forEach((item) => {
                    if (item !== selectedItem) item.classList.remove("active");
                });
                selectedItem.classList.toggle("active");
            });
        });
    };

    const setupModals = () => {
        document.querySelectorAll(".modal-open").forEach((button) => {
            button.addEventListener("click", () => {
                setModalOpenState(document.getElementById(button.dataset.modal), true);
            });
        });

        document.querySelectorAll(".modal-close").forEach((button) => {
            button.addEventListener("click", () => {
                setModalOpenState(document.getElementById(button.dataset.close), false);
            });
        });

        document.querySelectorAll(".modal").forEach((modal) => {
            modal.addEventListener("click", (event) => {
                if (event.target === modal) setModalOpenState(modal, false);
            });
        });
    };

    const formatAudioTime = (seconds) => {
        if (!Number.isFinite(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${remainingSeconds}`;
    };

    const setupCustomAudioPlayers = () => {
        document.querySelectorAll(".album-modal audio").forEach((audio) => {
            audio.hidden = true;

            const player = document.createElement("div");
            player.className = "custom-audio";
            player.innerHTML = `
                <button class="audio-toggle" type="button" aria-label="재생"></button>
                <span class="audio-time current">0:00</span>
                <input class="audio-progress" type="range" min="0" max="100" value="0" step="0.1" aria-label="재생 위치">
                <span class="audio-time duration">0:00</span>
            `;

            audio.insertAdjacentElement("afterend", player);

            const toggleButton = player.querySelector(".audio-toggle");
            const progress = player.querySelector(".audio-progress");
            const currentTime = player.querySelector(".audio-time.current");
            const durationTime = player.querySelector(".audio-time.duration");

            const updateDuration = () => {
                const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
                progress.max = duration || 100;
                durationTime.textContent = formatAudioTime(duration);
            };

            const updateProgress = () => {
                const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
                progress.value = duration ? audio.currentTime : 0;
                currentTime.textContent = formatAudioTime(audio.currentTime);
            };

            toggleButton.addEventListener("click", () => {
                if (audio.paused) {
                    document.querySelectorAll(".album-modal audio").forEach((otherAudio) => {
                        if (otherAudio !== audio) otherAudio.pause();
                    });
                    audio.play().catch(() => {});
                } else {
                    audio.pause();
                }
            });

            progress.addEventListener("input", () => {
                if (Number.isFinite(audio.duration)) audio.currentTime = Number(progress.value);
            });

            audio.addEventListener("loadedmetadata", updateDuration);
            audio.addEventListener("timeupdate", updateProgress);
            audio.addEventListener("play", () => {
                toggleButton.classList.add("playing");
                toggleButton.setAttribute("aria-label", "일시정지");
            });
            audio.addEventListener("pause", () => {
                toggleButton.classList.remove("playing");
                toggleButton.setAttribute("aria-label", "재생");
            });
            audio.addEventListener("ended", () => {
                toggleButton.classList.remove("playing");
            });

            updateDuration();
            updateProgress();
        });
    };

    const createSlider = ({ items, prevButton, nextButton, statusNode, onChange }) => {
        if (!items.length) return { getCurrentIndex: () => 0, render: () => {} };
        let currentIndex = 0;
        const render = () => {
            items.forEach((item, index) => item.classList.toggle("active", index === currentIndex));
            if (statusNode) statusNode.textContent = `${currentIndex + 1} / ${items.length}`;
            if (onChange) onChange(currentIndex);
        };
        if (prevButton) {
            prevButton.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                render();
            });
        }
        if (nextButton) {
            nextButton.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % items.length;
                render();
            });
        }
        render();
        return { getCurrentIndex: () => currentIndex, render };
    };

    const loadReactionData = (slideCount) => cloneDefaultReactionData(slideCount);
    const loadBoardPosts = (fallbackPosts) => fallbackPosts.map((post) => ({ ...post }));

    // --- 🌟 핵심: 게시글 상세 보기 및 댓글 기능 ---
    let currentDetailPost = null;

    const renderDetailComments = () => {
        const list = document.getElementById("detailCommentList");
        if (!list || !currentDetailPost) return;
        list.innerHTML = "";
        
        (currentDetailPost.comments || []).forEach(c => {
            const li = document.createElement("li");
            const nameStr = document.createElement("strong");
            nameStr.className = "reaction-author";
            nameStr.textContent = c.name;
            li.appendChild(nameStr);
            li.appendChild(document.createTextNode(`: ${c.text}`));
            list.appendChild(li);
        });
    };

    const openPostDetail = (post) => {
        currentDetailPost = post;
        const modal = document.getElementById("postDetailModal");
        if (!modal) return;
        
        document.getElementById("detailTitle").textContent = post.title;
        document.getElementById("detailMeta").textContent = `등록 일시: ${post.createdAt || "-"} | 작성자: ${post.writer}`;
        document.getElementById("detailContent").textContent = post.content;
        
        const imgEl = document.getElementById("detailImage");
        if (imgEl) {
            imgEl.src = post.imageData || "";
            imgEl.style.display = post.imageData ? "block" : "none";
        }
        
        renderDetailComments();
        setModalOpenState(modal, true);
    };

    const renderBoardPosts = (listNode, posts) => {
        if (!listNode) return;
        listNode.innerHTML = "";

        posts.forEach((post) => {
            const item = document.createElement("li");
            item.className = "board-post";

            const title = document.createElement("h4");
            title.textContent = post.title;

            const meta = document.createElement("p");
            meta.className = "board-post-meta";
            meta.textContent = `등록 일시: ${post.createdAt || "-"} | 작성자: ${post.writer}`;

            const previewWrap = document.createElement("div");
            previewWrap.className = "board-post-preview";

            const excerpt = document.createElement("p");
            excerpt.className = "board-post-excerpt";
            excerpt.textContent = post.content.length > 90 ? `${post.content.slice(0, 90)}...` : post.content;

            previewWrap.appendChild(excerpt);

            if (post.imageData) {
                const image = document.createElement("img");
                image.className = "board-post-image";
                image.src = post.imageData;
                image.alt = "첨부 이미지";
                previewWrap.appendChild(image);
            }

            item.appendChild(title);
            item.appendChild(meta);
            item.appendChild(previewWrap);

            // 게시물 클릭 시 상세 팝업창 띄우기 연결
            item.addEventListener("click", () => openPostDetail(post));

            listNode.appendChild(item);
        });
    };

    const renderReactionList = (reactionList, comments) => {
        if (!reactionList) return;
        reactionList.innerHTML = "";
        comments.forEach((comment) => {
            const item = document.createElement("li");
            const nameBold = document.createElement("strong");
            nameBold.className = "reaction-author";
            nameBold.textContent = comment.name;
            item.appendChild(nameBold);
            item.appendChild(document.createTextNode(`: ${comment.text}`));
            reactionList.appendChild(item);
        });
    };

    const setupMediaComments = (mediaSlider) => {
        const reactionForm = document.getElementById("reactionForm");
        const reactionName = document.getElementById("reactionName");
        const reactionInput = document.getElementById("reactionInput");
        const reactionList = document.getElementById("reactionList");
        const prevSlide = document.getElementById("prevSlide");
        const nextSlide = document.getElementById("nextSlide");

        if (!reactionForm || !reactionName || !reactionInput || !reactionList) return;

        const reactionData = loadReactionData(document.querySelectorAll(".slide").length);
        const syncReactionList = (index) => {
            if (!reactionData[index]) reactionData[index] = [];
            renderReactionList(reactionList, reactionData[index]);
        };

        syncReactionList(mediaSlider.getCurrentIndex());

        if (prevSlide) prevSlide.addEventListener("click", () => syncReactionList(mediaSlider.getCurrentIndex()));
        if (nextSlide) nextSlide.addEventListener("click", () => syncReactionList(mediaSlider.getCurrentIndex()));

        reactionForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = reactionName.value.trim() || "코닉이";
            const text = reactionInput.value.trim();
            const currentIndex = mediaSlider.getCurrentIndex();

            if (!text) return;

            // 새 댓글 등록 시 애니메이션처럼 보이도록 배열에 추가 후 재렌더링
            reactionData[currentIndex].push({ name, text });
            syncReactionList(currentIndex);

            reactionInput.value = "";
            reactionList.scrollTop = reactionList.scrollHeight; // 맨 아래로 자동 스크롤
        });
    };

    const formatPostDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}.${month}.${day} ${hours}:${minutes}`;
    };

    const readFileAsDataUrl = (file) =>
        new Promise((resolve) => {
            if (!file) { resolve(""); return; }
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result || "");
            reader.onerror = () => resolve("");
            reader.readAsDataURL(file);
        });

    const setupCommunityBoards = () => {
        const postModal = document.getElementById("postModal");
        const postModalTitle = document.getElementById("postModalTitle");
        const postForm = document.getElementById("postForm");
        const postBoardType = document.getElementById("postBoardType");
        const postWriter = document.getElementById("postWriter");
        const postTitle = document.getElementById("postTitle");
        const postContent = document.getElementById("postContent");
        const postImage = document.getElementById("postImage");

        const boardConfigs = {
            goods: { listNode: document.getElementById("goodsPostList"), posts: loadBoardPosts(defaultBoardPosts.goods) },
            free: { listNode: document.getElementById("freePostList"), posts: loadBoardPosts(defaultBoardPosts.free) }
        };

        const boardTabs = document.querySelectorAll(".board-tab");
        const boardPanels = document.querySelectorAll(".board-panel");

        boardTabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                const targetId = tab.dataset.boardTarget;
                boardTabs.forEach((item) => item.classList.remove("active"));
                boardPanels.forEach((panel) => panel.classList.remove("active"));
                tab.classList.add("active");
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) targetPanel.classList.add("active");
            });
        });

        Object.values(boardConfigs).forEach((config) => renderBoardPosts(config.listNode, config.posts));

        document.querySelectorAll(".open-post-modal").forEach((button) => {
            button.addEventListener("click", () => {
                const boardType = button.dataset.boardType;
                postBoardType.value = boardType;
                if (postModalTitle) postModalTitle.textContent = `${boardDisplayNames[boardType]} 게시물 등록`;
                if (postForm) postForm.reset();
                setModalOpenState(postModal, true);
            });
        });

        if (!postForm || !postBoardType || !postWriter || !postTitle || !postContent || !postImage) return;

        postForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const boardType = postBoardType.value;
            const boardConfig = boardConfigs[boardType];
            const writer = postWriter.value.trim() || "익명코닉";
            const title = postTitle.value.trim();
            const content = postContent.value.trim();

            if (!boardConfig || !title || !content) return;

            const imageData = await readFileAsDataUrl(postImage.files[0]);
            const newPost = {
                createdAt: formatPostDate(new Date()),
                writer, title, content, imageData, comments: []
            };

            boardConfig.posts.unshift(newPost);
            renderBoardPosts(boardConfig.listNode, boardConfig.posts);
            postForm.reset();
            setModalOpenState(postModal, false);
        });
        
        // --- 🌟 상세 모달창 내부의 댓글 작성 이벤트 ---
        const detailCommentForm = document.getElementById("detailCommentForm");
        if (detailCommentForm) {
            detailCommentForm.addEventListener("submit", (e) => {
                e.preventDefault();
                if (!currentDetailPost) return;
                
                const name = document.getElementById("detailCommentWriter").value.trim() || "코닉이";
                const text = document.getElementById("detailCommentText").value.trim();
                
                if (!text) return;
                
                if (!currentDetailPost.comments) currentDetailPost.comments = [];
                currentDetailPost.comments.push({ name, text });
                
                renderDetailComments();
                document.getElementById("detailCommentText").value = ""; // 입력창 비우기
                
                // 새 댓글이 작성되면 자동으로 스크롤을 맨 아래로 내리기
                const list = document.getElementById("detailCommentList");
                if (list) list.scrollTop = list.scrollHeight;
            });
        }
    };

    const setupPhotocard = () => {
        const photocardImage = document.getElementById("photocardImage");
        const photocardName = document.getElementById("photocardName");
        const photocardMessage = document.getElementById("photocardMessage");
        const drawCard = document.getElementById("drawCard");

        if (!drawCard || !photocardImage || !photocardName || !photocardMessage) return;

        drawCard.addEventListener("click", () => {
            const selectedCard = photocardData[Math.floor(Math.random() * photocardData.length)];
            photocardImage.innerHTML = `<img src="${selectedCard.image}" alt="${selectedCard.name}" style="width:100%; height:100%; object-fit:cover; border-radius:15px;">`;
            photocardName.textContent = `${selectedCard.name} 포토카드`;
            photocardMessage.textContent = selectedCard.message;
        });
    };

    const setupEventCalendar = () => {
        const calendarRoot = document.getElementById("eventCalendar");
        const monthLabel = document.getElementById("calendarMonthLabel");
        const selectedDateLabel = document.getElementById("calendarSelectedDate");
        const eventList = document.getElementById("calendarEventList");
        const prevButton = document.getElementById("calendarPrev");
        const nextButton = document.getElementById("calendarNext");
        const eventForm = document.getElementById("calendarEventForm");
        const eventTypeInput = document.getElementById("calendarEventType");
        const eventTitleInput = document.getElementById("calendarEventTitle");
        const eventNoteInput = document.getElementById("calendarEventNote");

        if (!calendarRoot || !monthLabel || !selectedDateLabel || !eventList || !prevButton || !nextButton || !eventForm || !eventTypeInput || !eventTitleInput || !eventNoteInput) return;

        const today = new Date();
        let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        let selectedDateKey = "";

        const calendarEvents = {
        
            "2026-06-01": [{ type: "팬 주최 이벤트", title: "생일 카페", note: "팬 행사 예시" }],
            "2026-01-03": [{ type: "🎉 생일", title: "DK (동혁) 생일", note: "우리 동댕이 생일 축하해! 🎂" }],
            "2026-01-26": [{ type: "🎉 생일", title: "CHAN (찬우) 생일", note: "막내온탑 찬우 탄신일! 🎂" }],
            "2026-02-07": [{ type: "🎉 생일", title: "JAY (진환) 생일", note: "요정 맏내 뿌요 생일 축하해요 🎂" }],
            "2026-02-08": [{ type: "🎉 생일", title: "SONG (윤형) 생일", note: "송프린스 탄신일! 맛있는 거 많이 먹기 🎂" }],
            "2026-03-31": [{ type: "🎉 생일", title: "JU-NE (준회) 생일", note: "구스키 탄신일! 평생 노래해줘 🎂" }],
            "2026-09-15": [{ type: "👑 기념일", title: "iKON 데뷔 기념일", note: "코닉이들과 함께한 소중한 날 ❤️" }],
            "2026-12-21": [{ type: "🎉 생일", title: "BOBBY (바비) 생일", note: "뜨거운 토끼 김지원 탄신일! 🎂" }],
            "2026-02-15": [{ type: "💿 솔로 데뷔", title: "DK 1st Solo [NAKSEO]", note: "동혁 솔로 데뷔 앨범 발매일" }],
            "2026-03-06": [{ type: "💿 솔로 데뷔", title: "SONG 1st EP [It's 콜!]", note: "윤형 첫 솔로 트로트 앨범 발매일" }],
            "2026-06-21": [{ type: "💿 솔로 데뷔", title: "JU-NE 1st Mini [BRUISE]", note: "준회 첫 솔로 앨범 발매일" }]
        };

        const formatDateKey = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        const formatMonthLabel = (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
        const formatDateLabel = (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

        const renderSelectedDateEvents = () => {
            const selectedDate = new Date(selectedDateKey);
            selectedDateLabel.textContent = formatDateLabel(selectedDate);
            const events = calendarEvents[selectedDateKey] || [];
            eventList.innerHTML = "";

            if (!events.length) {
                const emptyMessage = document.createElement("p");
                emptyMessage.className = "calendar-empty";
                emptyMessage.textContent = "등록된 일정이 없습니다.";
                eventList.appendChild(emptyMessage);
                return;
            }

            events.forEach((eventItem) => {
                const item = document.createElement("div");
                item.className = "calendar-event-item";
                item.innerHTML = `<h4>${eventItem.title}</h4><p>${eventItem.type}</p><p>${eventItem.note}</p>`;
                eventList.appendChild(item);
            });
        };

        const renderCalendar = () => {
            monthLabel.textContent = formatMonthLabel(currentMonth);
            calendarRoot.innerHTML = "";

            const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
            startDate.setDate(startDate.getDate() - startDate.getDay());

            for (let index = 0; index < 42; index += 1) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + index);
                const dateKey = formatDateKey(currentDate);
                const dayButton = document.createElement("button");
                dayButton.type = "button";
                dayButton.className = "calendar-day";

                if (currentDate.getMonth() !== currentMonth.getMonth()) dayButton.classList.add("other-month");
                if (dateKey === selectedDateKey) dayButton.classList.add("selected");

                const number = document.createElement("span");
                number.className = "calendar-day-number";
                number.textContent = currentDate.getDate();

                const eventWrap = document.createElement("div");
                eventWrap.className = "calendar-day-events";

                (calendarEvents[dateKey] || []).forEach((eventItem) => {
                    const chip = document.createElement("div");
                    chip.className = "calendar-event-chip";
                    chip.textContent = eventItem.title;
                    eventWrap.appendChild(chip);
                });

                dayButton.appendChild(number);
                dayButton.appendChild(eventWrap);

                dayButton.addEventListener("click", () => {
                    selectedDateKey = dateKey;
                    if (currentDate.getMonth() !== currentMonth.getMonth()) currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                    renderCalendar();
                    renderSelectedDateEvents();
                });

                calendarRoot.appendChild(dayButton);
            }
        };

        selectedDateKey = formatDateKey(today);
        prevButton.addEventListener("click", () => { currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1); renderCalendar(); });
        nextButton.addEventListener("click", () => { currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1); renderCalendar(); });

        eventForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const type = eventTypeInput.value;
            const title = eventTitleInput.value.trim();
            const note = eventNoteInput.value.trim();

            if (!title || !selectedDateKey) return;
            if (!calendarEvents[selectedDateKey]) calendarEvents[selectedDateKey] = [];

            calendarEvents[selectedDateKey].push({ type, title, note: note || "-" });
            eventForm.reset();
            renderCalendar();
            renderSelectedDateEvents();
        });

        renderCalendar();
        renderSelectedDateEvents();
    };

    // --- 전체 초기화 함수 실행 ---
    window.addEventListener("scroll", updateTopbarStyle);
    updateTopbarStyle();
    setupAccordion();
    setupModals();
    setupCustomAudioPlayers();

    const mediaSlider = createSlider({
        items: Array.from(document.querySelectorAll(".slide")),
        prevButton: document.getElementById("prevSlide"),
        nextButton: document.getElementById("nextSlide")
    });

    createSlider({
        items: Array.from(document.querySelectorAll(".pilgrimage-slide")),
        prevButton: document.getElementById("prevPilgrimage"),
        nextButton: document.getElementById("nextPilgrimage"),
        statusNode: document.getElementById("pilgrimageStatus")
    });

    setupMediaComments(mediaSlider);
    setupCommunityBoards();
    setupEventCalendar();
    setupPhotocard();
});
