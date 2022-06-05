import { axios } from "@/lib/axios";
import { ImageRequest } from "@/types";


export const getImageRequests = (): Promise<ImageRequest[]> => {
  return axios.get(`/image_requests`);
};

interface GetObservationImageRequestsOptions {
  observationId: number;
};

export const getObservationImageRequests = ({ observationId }: GetObservationImageRequestsOptions): Promise<ImageRequest[]> => {
  return axios.get(`/observations/${observationId}/image_requests`);
};

interface GetObservationImageRequestOptions {
  observationId: number;
  imageRequestId: number;
};

export const getObservationImageRequest = ({ observationId, imageRequestId }: GetObservationImageRequestOptions): Promise<ImageRequest> => {
  return axios.get(`/observations/${observationId}/image_requests/${imageRequestId}`);
};

interface CreateObservationImageRequestOptions {
  observationId: number;
  name: string;
  description: string;
};

export const createObservationImageRequest = ({ observationId, name, description }: CreateObservationImageRequestOptions): Promise<ImageRequest> => {
  return axios.post(`/observations/${observationId}/image_requests`, {
    name,
    description,
  });
};

interface AttachObservationToImageRequestOptions{
  observationId: number;
  imageRequestId: number;
}


export const attachObservationToImageRequest= ({ observationId, imageRequestId}:AttachObservationToImageRequestOptions) => {
    return axios.post(`/observations/${observationId}/image_requests/${imageRequestId}/attach`);
}

interface UpdateObservationImageRequestOptions {
  observationId: number;
  imageRequestId: number;
  name: string;
  description: string;
};

export const updateObservationImageRequest = ({ observationId, imageRequestId, name, description }: UpdateObservationImageRequestOptions): Promise<ImageRequest> => {
  return axios.post(`/observations/${observationId}/image_requests/${imageRequestId}`, {
    name,
    description,
  });
};

interface DeleteObservationImageRequestOptions {
  imageRequestId: number;
  observationId: number;
};

export const deleteObservationImageRequest = ({ imageRequestId, observationId }: DeleteObservationImageRequestOptions) => {
  return axios.delete(`/observations/${observationId}/image_requests/${imageRequestId}`);
};
