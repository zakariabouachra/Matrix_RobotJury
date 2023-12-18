from ..space_name import ns
from .convert_body import convert_body
from .convert_sourceDesc import convert_sourceDesc
from .convert_profile_desc import convert_profile_desc
from .convert_figures_tables import convert_figures_and_tables
from .convert_back import convert_back

def convert_structure(xml_element):
    result = {}
    # Conversion des informations du document XML
    print(xml_element)
    tei_header = xml_element.find(f'.//tei:teiHeader', namespaces=ns)
    if tei_header is not None:
        file_desc = tei_header.find(f'tei:fileDesc', namespaces=ns)
        
        lang = tei_header.get(f'{{{ns["xml"]}}}lang')
        if lang:
            result['Langue'] = lang
            if lang == 'en':
                title = file_desc.find(f'tei:titleStmt/tei:title', namespaces=ns)
                if title is not None:
                    result['title'] = title.text

                publication_stmt = file_desc.find(f'tei:publicationStmt', namespaces=ns)
                if publication_stmt is not None:
                    publisher = publication_stmt.find(f'tei:publisher', namespaces=ns)
                    date = publication_stmt.find(f'tei:date', namespaces=ns)
                    if publisher is not None or date is not None:
                        publie_par = {}
                        if publisher is not None:
                            publie_par['publisher'] = publisher.text
                        if date is not None:
                            publie_par['date'] = date.attrib.get('when', None)
                        result['Publie par'] = publie_par

                source_desc = convert_sourceDesc(file_desc.find(f'tei:sourceDesc', namespaces=ns))
                if source_desc:
                    result['Information'] = source_desc['information']
                    result['Auteurs'] = source_desc['authors']

                profile_desc = convert_profile_desc(tei_header.find(f'tei:profileDesc', namespaces=ns))
                if profile_desc:
                    result['Keywords'] = profile_desc.get('keywords', [])  # Utilise une liste vide si la clé 'keywords' est absente
                    result['Abstract'] = profile_desc['abstract']
                
                text = xml_element.find('tei:text', namespaces=ns)
                if text is not None:
                    body = text.find('tei:body', namespaces=ns)
                    if body is not None:
                        sections = convert_body(body)
                        result['Structure'] = sections
                        figures = convert_figures_and_tables(body)
                        result['Figures'] = figures
                    back = text.find('tei:back', namespaces=ns)
                    if back is not None:
                        notes = convert_back(back)
                        result['Notes'] = notes
                        
                return result
