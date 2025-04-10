import { getEnv } from '@app/shared/common/utils';
import { apiFetch } from './fetch';

const FILE_UPLOAD_URL = '/file-upload';

export function fileUpload(file: File, headers?: () => Headers) {
  const formData = new FormData();
  formData.append('file', file);

  return apiFetch.post(getEnv('API_URL'), FILE_UPLOAD_URL, { data: formData }, headers);
}
