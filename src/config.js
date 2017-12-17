const config = {
    gravity: 5,
    gravityStep: 1,
    gravityMultitype: 0.00001,
    primitives: {
        rectangle: {
            width: 64,
            height: 64
        },
        circle: {
            radius: 32
        },
        triangle: [
            -32, 64,
            32, 64,
            0, 0
        ],
        fiveSide: {
            radius: 32
        },
        sixSide: {
            radius: 32
        },
        ellipse: {
            width: 48,
            height: 24
        },
        random: {
            ellipse1: {
                width: 64,
                height: 12,
            },
            ellipse2: {
                width: 36,
                height: 24,
            },
            ellipse3: {
                width: 38,
                height: 12,
            }
        }
    }
};
export default config;