import { CellContent } from "../../gardens/grid";

export default interface Garden {
    name: string;
    width: number;
    height: number;
    cells: { [key: string]: CellContent[][] };
}
