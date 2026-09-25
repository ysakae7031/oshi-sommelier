import { preventFocusSteal, deferListMutation } from "../../utils/preventFocusSteal";

const MAX_DIMENSION = 800;

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function ImagePicker({ images, onChange }) {
  async function handleFiles(fileList) {
    const files = Array.from(fileList);
    const resized = await Promise.all(files.map(resizeImage));
    onChange([...images, ...resized]);
  }

  function removeImage(index) {
    deferListMutation(() => onChange(images.filter((_, i) => i !== index)));
  }

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        {images.map((src, i) => (
          <div key={i} className="relative h-20 w-20 overflow-hidden rounded-btn">
            <img src={src} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onMouseDown={preventFocusSteal}
              onClick={() => removeImage(i)}
              className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal/70 text-xs text-white"
              aria-label="画像を削除"
            >
              ×
            </button>
          </div>
        ))}
        <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-btn border border-dashed border-linen-edge text-2xl text-warm-gray">
          ＋
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </label>
      </div>
    </div>
  );
}
