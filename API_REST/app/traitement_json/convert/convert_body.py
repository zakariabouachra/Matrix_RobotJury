from ..process.extract_references import extract_references
from ..space_name import ns

def convert_body(body):
    sections = body.findall('.//tei:div', namespaces=ns)
    all_sections = {'Introduction': [], 'Conclusion': [], 'Other': []}

    for section in sections:
        section_info = {}
        head = section.find('.//tei:head', namespaces=ns)

        if head is not None:
            section_type = head.text.lower()
            head_number = head.attrib.get('n') 

            if not head.text.lower().startswith('figure'):
                paragraphs = section.findall('.//tei:p', namespaces=ns)

                all_head = []
                if head_number:
                    all_head.append(head_number)
                all_head.append(head.text)

                all_text = []
                all_references = []

                for paragraph in paragraphs:
                    if paragraph is not None:
                        sentences = paragraph.findall('.//tei:s', namespaces=ns)
                        for sentence_item in sentences:
                            all_text.append(sentence_item.text)
                            references = extract_references(sentence_item)
                            all_references.extend(references)

                section_info['title'] = all_head
                section_info['text'] = all_text
                section_info['references'] = all_references

                if section_type == 'introduction' or section_type == "introducción":
                    all_sections['Introduction'].append(section_info)
                elif section_type == 'conclusion':
                    all_sections['Conclusion'].append(section_info)
                else:
                    all_sections['Other'].append(section_info)

    return all_sections