from ..space_name import ns

def process_figure(figure):
    figure_info = {}
    head = figure.find('.//tei:head', namespaces=ns)

    if head is not None:
        figure_info['title'] = head.text
        label = figure.find('.//tei:label', namespaces=ns)
        figure_info['label'] = label.text if label is not None else None

        fig_desc = figure.find('.//tei:figDesc', namespaces=ns)
        if fig_desc is not None:
            paragraphs = fig_desc.findall('.//tei:p', namespaces=ns)
            all_text = []
            for paragraph in paragraphs:
                if paragraph is not None:
                    sentences = paragraph.findall('.//tei:s', namespaces=ns)
                    for sentence_item in sentences:
                        all_text.append(sentence_item.text)
            figure_info['description'] = all_text

    return figure_info