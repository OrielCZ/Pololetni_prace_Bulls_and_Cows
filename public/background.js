    //Background
//Pohyblivé pozadí
/*
function createAnimal() {
    const animal = document.createElement("div");
    animal.classList.add("animal");

    let startX = Math.random() * window.innerWidth;
    let startY = Math.random() * window.innerHeight;
    let endX = Math.random() * window.innerWidth;
    let endY = Math.random() * window.innerHeight;

    animal.style.left = `${startX}px`;
    animal.style.top = `${startY}px`;

    document.body.appendChild(animal);

    animal.animate([
        { transform: `translate(0, 0)` },
        { transform: `translate(${endX - startX}px, ${endY - startY}px)` }
    ], {
        duration: Math.random() * 5000 + 5000, // 5-10 sekund
        iterations: Infinity,
        direction: "alternate"
    });
}

// Generuje několik zvířátek na začátku
for (let i = 0; i < 4; i++) {
    createAnimal();
}
*/

class Cow {
    constructor(id) {
        this.id = id;
        this.element = document.createElement("div");
        this.element.classList.add("cow");
        document.getElementById("background").appendChild(this.element);
        this.setRandomPosition();
        this.startBehavior();
    }

    setRandomPosition() {
        this.x = Math.random() * window.innerWidth * 0.8;
        this.y = Math.random() * window.innerHeight * 0.8;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    startBehavior() {
        setInterval(() => {
            const action = Math.random();
            if (action < 0.6) {
                this.moveRandomly();
            } else if (action < 0.8) {
                this.eatGrass();
            } else {
                this.rest();
            }
        }, 3000);
    }

    moveRandomly() {
        let dx = (Math.random() - 0.5) * 200;
        let dy = (Math.random() - 0.5) * 200;
        this.x = Math.max(0, Math.min(window.innerWidth - 50, this.x + dx));
        this.y = Math.max(0, Math.min(window.innerHeight - 50, this.y + dy));
        this.updatePosition();
        this.element.classList.add("walking");
        setTimeout(() => this.element.classList.remove("walking"), 1000);
    }

    eatGrass() {
        this.element.classList.add("eating");
        setTimeout(() => this.element.classList.remove("eating"), 2000);
    }

    rest() {
        this.element.classList.add("resting");
        setTimeout(() => this.element.classList.remove("resting"), 3000);
    }
}

// Generujeme kravičky
for (let i = 0; i < 5; i++) {
    new Cow(i);
}
