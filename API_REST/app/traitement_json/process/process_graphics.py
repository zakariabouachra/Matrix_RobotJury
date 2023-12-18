def process_graphics(graphic):
    graphic_info = {}
    graphic_info['type'] = graphic.attrib.get('type')
    graphic_info['coords'] = graphic.attrib.get('coords')
    return graphic_info

