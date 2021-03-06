import { MIMETYPE } from '~/assets/helpers/formats';

export interface OriginalsStore {
  images: Map<string, ImageStore>;
  update?: Date;
}

export interface ImageStore {
  buffer: Uint8Array;
  height: number;
  id: string;
  mimetype?: MIMETYPE;
  size?: number;
  width: number;
}

export const state = (): OriginalsStore => ({
  images: new Map<string, ImageStore>()
});

export const mutations = {
  set(current: OriginalsStore, image: ImageStore) {
    const model = current.images.get(image.id);
    const updated = Object.assign({}, model || null, image);
    current.images.set(image.id, updated);
    current.update = new Date();
  },
  delete(current: OriginalsStore, id: string) {
    current.images.delete(id);
  }
};

export const getters = {
  image: (current: OriginalsStore) => (id: string) => current.images.get(id)
};

export const actions = {
  id(context: any, { id, update }: { id: string; update: string }): void {
    const image: ImageStore = context.getters.image(id);
    context.commit('set', { ...image, id: update });
    context.commit('delete', id);
  }
};
