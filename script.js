class ImageBuilder {
    constructor() {
        this.container = document.getElementById('imagesPosts');
        this.fetchPosts('data.json');
    }

    fetchPosts(data) {
        fetch(data)
            .then(response => response.json())
            .then(data => {
                data = ImageBuilder.shuffleArray(data);
                data.forEach(item => {
                    this.addImagePost(item);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    addImagePost(item) {
        const container = document.createElement('div');
        container.classList.add('img');

        const title = document.createElement('h2');
        title.textContent = item.title;
        container.appendChild(title);

        const imagePath = `content/${item.image}`;
        const image = document.createElement('img');
        image.src = imagePath;
        container.appendChild(image);

        if (item.subtitle) {
            const subtitle = document.createElement('p');
            subtitle.classList.add('image-subtitle');
            subtitle.textContent = item.subtitle;
            subtitle.style.textAlign = "right"; // Align text to the right
            subtitle.style.maxWidth = "80%"; // Set a maximum width (adjust as needed)
            container.appendChild(subtitle);
        }        

        this.container.appendChild(container);
    }

    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }
}

// Instantiate ImageBuilder when the script is loaded
window.onload = function() {
    new ImageBuilder();
};
