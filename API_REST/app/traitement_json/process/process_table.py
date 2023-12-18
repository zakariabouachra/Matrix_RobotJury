from ..space_name import ns

def process_table(table):
    table_info = {}
    head = table.find('.//tei:head', namespaces=ns)

    if head is not None:
        table_info['title'] = head.text
        label = table.find('.//tei:label', namespaces=ns)
        table_info['label'] = label.text if label is not None else None

        table_desc = table.find('.//tei:figDesc', namespaces=ns)
        if table_desc is not None:
            paragraphs = table_desc.findall('.//tei:p', namespaces=ns)
            all_text = []
            for paragraph in paragraphs:
                if paragraph is not None:
                    sentences = paragraph.findall('.//tei:s', namespaces=ns)
                    for sentence_item in sentences:
                        all_text.append(sentence_item.text)
            table_info['description'] = all_text

        rows = table.findall('.//tei:row', namespaces=ns)
        table_info['rows'] = []
        for row in rows:
            cells = row.findall('.//tei:cell', namespaces=ns)
            row_info = {'cells': []}
            for cell in cells:
                row_info['cells'].append(cell.text)
            table_info['rows'].append(row_info)

    return table_info