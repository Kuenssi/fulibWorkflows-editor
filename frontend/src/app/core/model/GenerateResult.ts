export interface GenerateResult {
  board: string,
  pages: Map<number, string>,
  numberOfPages: number,
  diagrams: Map<number, string>,
  numberOfDiagrams: number,
}
