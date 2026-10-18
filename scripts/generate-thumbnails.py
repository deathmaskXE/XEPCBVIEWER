#!/usr/bin/env python3
"""Generate public thumbnail JPEGs from supported files; safe labeled fallback otherwise."""
import json, os, sys, hashlib
from pathlib import Path
from urllib.parse import quote
from PIL import Image, ImageOps, ImageDraw, ImageFont
try:
 import fitz
except ImportError:
 fitz=None
root=Path('public/biblioteca'); out=Path('public/miniaturas'); out.mkdir(parents=True,exist_ok=True)
index=root/'index.json'
items=json.loads(index.read_text(encoding='utf-8')) if index.exists() else []
fontpath='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(sz):
 try:return ImageFont.truetype(fontpath,sz)
 except:return ImageFont.load_default()
def fallback(item,ext):
 im=Image.new('RGB',(640,360),'#101920');d=ImageDraw.Draw(im)
 d.rounded_rectangle((15,15,624,344),radius=20,outline='#12E7F5',width=4)
 d.line((30,64,610,64),fill='#586C78',width=2)
 d.text((40,29),'XEPCB  /  VISTA PREVIA',font=font(20),fill='#EAFBFF')
 d.rounded_rectangle((175,95,465,222),radius=14,outline='#18BFD0',width=3)
 d.text((320,145),ext.replace('.','').upper() or 'ARCHIVO',anchor='mm',font=font(42),fill='#FFFFFF')
 title=item['title']
 if len(title)>44:title=title[:41]+'...'
 d.text((320,280),title,anchor='mm',font=font(17),fill='#CEDCE3')
 d.text((320,314),'Miniatura de tipo de archivo',anchor='mm',font=font(13),fill='#8298A5')
 return im
def image_thumb(path):
 with Image.open(path) as src:
  src.seek(0)
  return ImageOps.exif_transpose(src).convert('RGB').copy()
def pdf_thumb(path):
 if not fitz:raise RuntimeError('PyMuPDF unavailable')
 doc=fitz.open(str(path))
 try:
  if not doc.page_count:raise ValueError('PDF sin páginas')
  page=doc[0];pix=page.get_pixmap(matrix=fitz.Matrix(1.4,1.4),alpha=False)
  return Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
 finally:doc.close()
def psd_thumb(path):
 return image_thumb(path)
def fit_image(src):
 src.thumbnail((590,300),Image.Resampling.LANCZOS)
 canvas=Image.new('RGB',(640,360),'#101920');canvas.paste(src,((640-src.width)//2,(360-src.height)//2))
 ImageDraw.Draw(canvas).rounded_rectangle((5,5,634,354),radius=15,outline='#12DDEC',width=3)
 return canvas
count={'real':0,'fallback':0}
for item in items:
 rel=item['url'].removeprefix('biblioteca/')
 from urllib.parse import unquote
 path=root.joinpath(*[unquote(p) for p in rel.split('/')]);ext=path.suffix.lower()
 key=hashlib.sha256(rel.encode()).hexdigest()[:20];name=f'{key}.jpg';dest=out/name
 try:
  if ext in ('.png','.jpg','.jpeg','.webp','.bmp','.gif','.tif','.tiff'):im=image_thumb(path)
  elif ext=='.pdf':im=pdf_thumb(path)
  elif ext=='.psd':im=psd_thumb(path)
  else:raise ValueError('Formato sin renderizador fiable')
  im=fit_image(im);count['real']+=1
 except Exception:
  im=fallback(item,ext);count['fallback']+=1
 im.save(dest,'JPEG',quality=80,optimize=True)
 item['thumbnail']='miniaturas/'+quote(name)
# Public index never exposes file URLs. GitHub public repository still exposes original files.
public=[{k:v for k,v in item.items() if k!='url'} for item in items]
Path('public/catalogo-publico.json').write_text(json.dumps(public,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
index.write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Miniaturas: {count["real"]} vistas reales, {count["fallback"]} identificativas, {len(items)} entradas')
