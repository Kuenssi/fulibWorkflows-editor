export const pmExample =
  '- service: StudyGuide\n' +
  '\n' +
  '- data: Student carli\n' +
  '  motivation: 83\n' +
  '  stops: [stop1]\n' +
  '  stops.back: student\n' +
  '\n' +
  '- data: Stop stop1\n' +
  '  motivation: 66\n' +
  '  room: r1\n' +
  '  room.back: [stops]\n' +
  '\n' +
  '- data: Room r1\n' +
  '  topic: math\n' +
  '  credits: 17\n' +
  '  neighbors: [r2, r5]\n' +
  '  neighbors.back: [neighbors]\n' +
  '\n' +
  '- data: Room r2\n' +
  '  topic: calculus\n' +
  '  credits: 20\n' +
  '  neighbors: [r1, r5]\n' +
  '\n' +
  '- data: Room r4\n' +
  '  topic: exam\n' +
  '  neighbors: [r5]\n' +
  '\n' +
  '- data: Room r5\n' +
  '  topic: modeling\n' +
  '  credits: 29\n' +
  '  neighbors: [r1, r2, r4]\n' +
  '\n' +
  '- command: findRoute\n' +
  '  student: carli\n' +
  '\n' +
  '- data: Stop stop2\n' +
  '  room: calculus\n' +
  '  motivation: 56\n' +
  '  prev: stop1\n' +
  '  prev.back: [next]\n' +
  '\n' +
  '- data: Student carli\n' +
  '  route: math -> calculus -> math -> modeling -> exam\n';
