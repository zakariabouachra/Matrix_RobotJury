from ..process.process_references import process_references
from ..space_name import ns

def convert_back(document):
    back_info = {}

    acknowledgements = document.find('.//tei:div[@type="acknowledgement"]', namespaces=ns)
    funding_list = document.find('.//tei:listOrg[@type="funding"]', namespaces=ns)
    availability = document.find('.//tei:div[@type="availability"]', namespaces=ns)
    annex = document.find('.//tei:div[@type="annex"]', namespaces=ns)
    references_section = document.find('.//tei:div[@type="references"]', namespaces=ns)
    references_info = process_references(references_section)

    if acknowledgements is not None:
        head_element = acknowledgements.find('.//tei:head', namespaces=ns)
        ack_info = {'head': head_element.text if head_element is not None else None}
        back_info['acknowledgements'] = ack_info

    if funding_list is not None:
        funding_info = {'type': funding_list.get('type')}
        back_info['funding_list'] = funding_info

    if availability is not None:
        availability_info = {'content': []}
        sentences = availability.findall('.//tei:p/tei:s', namespaces=ns)

        for sentence in sentences:
            availability_info['content'].append(sentence.text)

        back_info['availability'] = availability_info

    if annex is not None:
        annex_info = {'content': []}
        paragraphs = annex.findall('.//tei:p', namespaces=ns)

        for paragraph in paragraphs:
            sentences = paragraph.findall('.//tei:s', namespaces=ns)

            for sentence in sentences:
                annex_info['content'].append(sentence.text)

        back_info['annex'] = annex_info

    if references_info is not None:
        back_info['references'] = references_info

    return back_info