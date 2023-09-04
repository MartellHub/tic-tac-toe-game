"use client";
"use strict";
import { baseOverrides } from "next/dist/server/require-hook";
import { JSX, PromiseLikeOfReactNode, ReactNode, useState } from "react";

let winMsg:
  | string
  | number
  | boolean
  | JSX.Element
  | Iterable<ReactNode>
  | PromiseLikeOfReactNode
  | null
  | undefined;

const createBoard = (size: number) => {
  const board = [];
  for (let i = 0; i < size; i++) {
    board.push([...Array(size)]);
  }
  return board;
};

const checkHorizontal = (board: any) => {
  for (let row of board) {
    const rowSet = new Set(row);
    if (rowSet.size == 1 && !rowSet.has(undefined)) {
      return true;
    }
  }
};

const rowToColum = (board: any) =>{
  const newBoard = []
  let column = 0
  while(column < board.length){
    const newRow = []
    for(let row = 0; row < board.length; row++){
      newRow.push(board[row][column])
    }
    newBoard.push(newRow)
    column++
  }
  return newBoard
}

const diagonalToRow = (board: any) =>{
  const newBoard = [[],[]]
  let increment = 0
  let decrement = board.length -1
  while(increment < board.length){
    newBoard[0].push(board[increment][increment])
    newBoard[1].push(board[increment][decrement])
    increment++
    decrement--
  }
  return newBoard
}

const checkForWin = (board: any[][]) => {
  //horizontal
  if (checkHorizontal(board)) {
    return true;
  }
  //vertical
  if (checkHorizontal(rowToColum(board))) {
    return true;
  }
  //diagonal
  if (checkHorizontal(diagonalToRow(board))) {
    return true;
  }
};

export default function Game() {
  const [board, setBoard] = useState(createBoard(3));
  const [currPlayer, setCurrPlayer] = useState("X");

  const handelClick = (row: number, coll: number) => {
    board[row][coll] = currPlayer;
    setBoard([...board]);
    if (checkForWin(board)) {
      console.log(`player ${currPlayer} wins`);
      winMsg = <h2 className='mt-3'>{currPlayer} wins</h2>;
    }
    setCurrPlayer(currPlayer == "X" ? "O" : "X");
  };

  const reset = () => {
    setBoard(createBoard(3));
    setCurrPlayer("X");
    winMsg = "";
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='mb-3'>Game</h1>
      {board.map((row, r) => {
        return (
          <div
            key={r}
            className='flex'
          >
            {row.map((cell, c) => {
              return (
                <div
                  key={c}
                  className='h-10 w-10 flex justify-center items-center border-2 border-indigo-600 '
                  onClick={() => handelClick(r, c)}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
      <button
        onClick={reset}
        className='m-auto mt-4 bg-slate-600 px-2 py-1 rounded-full hover:bg-slate-500'
      >
        Reset
      </button>
      {winMsg}
    </div>
  );
}
