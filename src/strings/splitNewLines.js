import S from 'sanctuary'

const splitNewLines = S.splitOnRegex(/\r\n|\n/g); // String -> [String]

export { splitNewLines}
