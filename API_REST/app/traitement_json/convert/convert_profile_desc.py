from ..space_name import ns

def convert_profile_desc(profile_desc):
    profile_info = {}

    keywords_elem = profile_desc.find('tei:textClass/tei:keywords', namespaces=ns)
    if keywords_elem is not None:
        terms = keywords_elem.findall('tei:term', namespaces=ns)
        keywords = [term.text for term in terms]
        profile_info['keywords'] = keywords

    abstract_elem = profile_desc.find('tei:abstract', namespaces=ns)
    if abstract_elem is not None:
        abstracts = abstract_elem.findall('tei:div/tei:p/tei:s', namespaces=ns)
        abstract_texts = [s.text for s in abstracts if s.text is not None]
        profile_info['abstract'] = '\n'.join(abstract_texts)
        
    return profile_info