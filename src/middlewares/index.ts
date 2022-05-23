import { handleBodyRequestParsing, handleCors, handleHelmet, handleCompression } from './common';

export default [handleCors, handleBodyRequestParsing, handleHelmet, handleCompression];
