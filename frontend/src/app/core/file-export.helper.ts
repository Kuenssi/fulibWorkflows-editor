import {saveAs} from 'file-saver';

export const FILE_TYPES_MIME_MAP = {
  html: 'application/xhtml+xml',
  yaml: 'text/plain', // TODO This might become a problem?
  zip: 'application/zip',
};

type FileType = keyof typeof FILE_TYPES_MIME_MAP;

export class FileExportHelper {
  // TODO This method will probably be useful for zip download
  static resToFileDownload(res: any, fileName: string, fileType: FileType) {
    const blob = new Blob([res.body], {type: fileType});
    const file = new File([blob], fileName, {type: fileType});
    saveAs(file);
  }

  static stringToFileDownload(value: string, fileName: string, fileType: FileType) {
    const file = new File([value], fileName, {type: fileType});
    saveAs(file);
  }
}
