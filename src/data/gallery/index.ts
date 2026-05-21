import { HALDI_MEHANDI_GALLERY } from "./haldiMehandi";
import { PROPOSAL_GALLERY } from "./proposal";
import { RECEPTION_GALLERY } from "./reception";
import { WEDDINGS_GALLERY } from "./weddings";

export const GALLERY_DATA = [
  ...HALDI_MEHANDI_GALLERY,
  ...PROPOSAL_GALLERY,
  ...RECEPTION_GALLERY,
  ...WEDDINGS_GALLERY,
];

export * from "./haldiMehandi";
export * from "./proposal";
export * from "./reception";
export * from "./weddings";
