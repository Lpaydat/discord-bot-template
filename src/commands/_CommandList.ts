import { Command } from "../interfaces/Command";
import { edit } from "./edit";
import { help } from "./help";
import { oneHundred } from "./oneHundred";
import { view } from "./view";

export const CommandList: Command[] = [oneHundred, edit, view, help];
