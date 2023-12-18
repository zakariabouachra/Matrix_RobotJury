from ..space_name import ns

def extract_references(sentence):
    references = []
    if sentence is not None:
        for ref in sentence.findall(f'tei:ref', namespaces=ns):
            ref_data = ref.text if ref is not None else None
            references.append(ref_data)

    return references