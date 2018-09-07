let lag = 0.0;
let previous = Date.now();
const MS_PRE_UPDATE = 1000 / 60;






function loop(timestamp) {
    let current = Date.now();
    let elapsed = current - previous;
    previous = current;
    lag += elapsed;

    processInput();
    while (lag >= MS_PRE_UPDATE) {
        update();
        lag -= MS_PRE_UPDATE;
    }

    render(lag / MS_PRE_UPDATE);
    requestAnimationFrame(loop);
}

function processInput() {

}

function update() {

}

function render() {

}


function main() {
    requestAnimationFrame(loop)
}

main();