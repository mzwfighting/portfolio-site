"""Generate only the Source Han Sans glyphs used by the cover's 3D lettering."""
import json
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen

root = Path(__file__).resolve().parents[1]
font = TTFont(root / 'public/fonts/SourceHanSansCN-VF.woff2', lazy=True)
glyph_set = font.getGlyphSet(location={'wght': 500})

class TypefacePen(BasePen):
    def __init__(self):
        super().__init__(glyph_set)
        self.outline = []
    def emit(self, command, *points):
        self.outline.append(command)
        self.outline.extend(str(round(value)) for point in points for value in point)
    def _moveTo(self, point):
        self.start = point
        self.emit('m', point)
    def _lineTo(self, point):
        self.emit('l', point)
    def _qCurveToOne(self, control, end):
        self.emit('q', end, control)
    def _curveToOne(self, control1, control2, end):
        self.emit('b', end, control1, control2)
    def _closePath(self):
        self.emit('l', self.start)

glyphs = {}
cmap = font.getBestCmap()
for letter in dict.fromkeys('PORTFOLIO?'):
    codepoint = ord(letter)
    name = cmap[codepoint]
    pen = TypefacePen()
    glyph_set[name].draw(pen)
    glyphs[chr(codepoint)] = {'ha': font['hmtx'][name][0], 'o': ' '.join(pen.outline)}
assert all(glyphs[letter]['o'] for letter in 'PORTFOLIO')
data = {'familyName': 'Source Han Sans', 'resolution': font['head'].unitsPerEm,
        'ascender': font['hhea'].ascent, 'descender': font['hhea'].descent,
        'boundingBox': {'yMin': font['head'].yMin, 'yMax': font['head'].yMax},
        'underlineThickness': font['post'].underlineThickness, 'glyphs': glyphs}
(root / 'lib/fonts/source-han-sans-cover.typeface.json').write_text(json.dumps(data), encoding='utf-8')
print('Generated Source Han Sans 3D cover glyphs.')
