// CONFIG
var Config = {
    gridName: 'grid',
    size: {
        width: 10, //10 cells across
        height: 20 //20 cells down
    },
    cellDefaultColor: '#fff',
    colors: [
        'color1', 'color2', 'color3', 'color4', 'color5'
    ],
    shapes: [
        //shape I
        //* 1 2 3 4 5 6 7 8 9
        //0 . . . . X . . . .
        //1 . . . . X . . . .
        //2 . . . . X . . . .
        //3 . . . . X . . . .
        //4 . . . . . . . . .

        //* 1 2 3 4 5 6 7 8 9
        //0 . . X X X X . . .
        //1 . . . . . . . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .
        [
            [
                [5, 0],
                [5, 1],
                [5, 2],
                [5, 3]
            ],
            [
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0]
            ]
        ],

        //shape L
        //* 1 2 3 4 5 6 7 8 9
        //0 . . . X . . . . 
        //1 . . . X . . . . .
        //2 . . . X X . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //* 1 2 3 4 5 6 7 8 9
        //0 . . . X X X . . .
        //1 . . . X . . . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //* 1 2 3 4 5 6 7 8 9
        //0 . . . . X X . . .
        //1 . . . . . X . . .
        //2 . . . . . X . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //* 1 2 3 4 5 6 7 8 9
        //0 . . . . . X . . .
        //1 . . . X X X . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        [
            [
                [4, 0],
                [4, 1],
                [4, 2],
                [5, 2]
            ],
            [
                [4, 0],
                [5, 0],
                [6, 0],
                [4, 1]
            ],
            [
                [5, 0],
                [6, 0],
                [6, 1],
                [6, 2]
            ],
            [
                [4, 1],
                [5, 1],
                [6, 0],
                [6, 1]
            ]
        ],
// ****HERE
        //shape backwards L
        //* 1 2 3 4 5 6 7 8 9
        //0 . . . X . . . . .
        //1 . . . X . . . . .
        //2 . . X X . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //* 1 2 3 4 5 6 7 8 9
        //0 . . X . . . . . . 
        //1 . . X X X . . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //* 1 2 3 4 5 6 7 8 9
        //0 . . X X . . . . .
        //1 . . X . . . . . .
        //2 . . X . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //* 1 2 3 4 5 6 7 8 9
        //0 . . X X X . . . .
        //1 . . . . X . . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .
        [
            [
                [4, 0],
                [4, 1],
                [4, 2],
                [3, 2]
            ],
            [
                [3, 0],
                [3, 1],
                [4, 1],
                [5, 1]
            ],
            [
                [3, 0],
                [4, 0],
                [3, 1],
                [3, 2]
            ],
            [
                [3, 0],
                [4, 0],
                [5, 0],
                [5, 1]
            ]
        ],

        //shape square 
        //* 1 2 3 4 5 6 7 8 9
        //0 . . . X X . . . .
        //1 . . . X X . . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .
        [
            [
                [4, 0],
                [5, 0],
                [4, 1],
                [5, 1]
            ]
        ],

        //shape T
        //* 1 2 3 4 5 6 7 8 9
        //0 . . X X X . . . .
        //1 . . . X . . . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //* 1 2 3 4 5 6 7 8 9
        //0 . . . . X . . . . 
        //1 . . . X X . . . .
        //2 . . . . X . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //* 1 2 3 4 5 6 7 8 9
        //0 . . . X . . . . .
        //1 . . X X X . . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //* 1 2 3 4 5 6 7 8 9
        //0 . . X . . . . . .
        //1 . . X X . . . . .
        //2 . . X . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .
        [
            [
                [3, 0],
                [4, 0],
                [5, 0],
                [4, 1]
            ],
            [
                [4, 1],
                [5, 0],
                [5, 1],
                [5, 2]
            ],
            [
                [3, 1],
                [4, 0],
                [4, 1],
                [5, 1]
            ],
            [
                [3, 0],
                [3, 1],
                [3, 2],
                [4, 1]
            ]
        ],

        //shape Z
        //* 1 2 3 4 5 6 7 8 9
        //0 . . X X . . . . .
        //1 . . . X X . . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //* 1 2 3 4 5 6 7 8 9
        //0 . . . . X . . . .
        //1 . . . X X . . . .
        //2 . . . X . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        [
            [
                [3, 0],
                [4, 0],
                [4, 1],
                [5, 1]
            ],
            [
                [4, 1],
                [4, 2],
                [5, 0],
                [5, 1]
            ],
        ],

        //shape backwards Z
        //* 1 2 3 4 5 6 7 8 9
        //0 . . . X X . . . .
        //1 . . X X . . . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //0 . . . X . . . . .
        //1 . . . X X . . . .
        //2 . . . . X . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .
        [
            [
                [4, 0],
                [5, 0],
                [3, 1],
                [4, 1]
            ],
            [
                [4, 0],
                [4, 1],
                [5, 1],
                [5, 2]
            ]
        ]
    ],
    interval: 1000
}