import { types } from "mobx-state-tree";
import { Message } from "./Message";


export const History = types.array(Message);
