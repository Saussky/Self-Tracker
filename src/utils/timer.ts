class Timer {
    time: number
    direction: string
    activity: string
    hours: number
    minutes: number
    seconds: number
    interval: NodeJS.Timeout | undefined

    constructor(time: number, direction: string, activity: string) {
        this.time = time;
        this.direction = direction;
        this.activity = activity;

        this.update()

        this.hours = Math.floor(this.time / 3600)
        this.minutes = Math.floor((this.time / 60) % 60)
        this.seconds = Math.floor(this.time % 60)

        this.interval = undefined;
    }

    update() {
        this.hours = Math.floor(this.time / 3600);
        this.minutes = Math.floor((this.time / 60) % 60);
        this.seconds = Math.floor(this.time % 60);

        // if (seconds < 10) { seconds = `0${seconds}`; }
        // if (minutes < 10) { minutes = `0${minutes}`; }
        // if (hours < 10) { hours = `0${hours}`; }
    }

    countDown() {
        this.time -= 1;
        this.update();
    }

    countUp() {
        this.time += 1;
        this.update();
    }

    start() {
        if (this.direction === 'down') {
            this.interval = setInterval(() => this.countDown(), 1000);
        } else if (this.direction === 'up') {
            this.interval = setInterval(() => this.countUp(), 1000);
        }
    }

    stop() {
        clearInterval(this.interval);
    }

    addFive() {
        this.time += 300;
        this.update();
    }

    subtractFive() {
        this.time -= 300;
        this.update();
    }
}

export default Timer;
