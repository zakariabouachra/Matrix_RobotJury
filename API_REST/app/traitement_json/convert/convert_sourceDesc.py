from ..space_name import ns

def convert_sourceDesc(source_desc):
    authors = {}
    article_info = {}
    if source_desc is not None:
        bibl_struct = source_desc.find(f'tei:biblStruct', namespaces=ns)
        if bibl_struct is not None:
            analytic = bibl_struct.find(f'tei:analytic', namespaces=ns)
            if analytic is not None:
                author_list = analytic.findall(f'tei:author', namespaces=ns)
                for idx, author_info in enumerate(author_list):
                    pers_name = author_info.find(f'tei:persName', namespaces=ns)
                    if pers_name is not None:
                        author_key = f'Auteur {idx + 1}'
                        author_data = {
                            'ORCID': author_info.findtext(f'tei:idno[@type="ORCID"]', namespaces=ns),
                            'prenom': pers_name.findtext(f'tei:forename', namespaces=ns),
                            'nom': pers_name.findtext(f'tei:surname', namespaces=ns)
                        }
                        authors[author_key] = author_data

                monogr = bibl_struct.find(f'tei:monogr', namespaces=ns)
                if monogr is not None:
                    issn = monogr.findtext(f'tei:idno[@type="ISSN"]', namespaces=ns)
                    eissn = monogr.findtext(f'tei:idno[@type="eISSN"]', namespaces=ns)
                    publisher = monogr.findtext(f'tei:imprint/tei:publisher', namespaces=ns)
                    volume_elem = monogr.find(f'tei:imprint/tei:biblScope[@unit="volume"]', namespaces=ns)
                    volume = volume_elem.text if volume_elem is not None else None
                    issue_elem = monogr.find(f'tei:imprint/tei:biblScope[@unit="issue"]', namespaces=ns)
                    issue = issue_elem.text if issue_elem is not None else None
                    bibl_scope_elem = monogr.find(f'tei:imprint/tei:biblScope[@unit="page"]', namespaces=ns)
                    page_from = bibl_scope_elem.attrib.get('from') if bibl_scope_elem is not None else None
                    page_to = bibl_scope_elem.attrib.get('to') if bibl_scope_elem is not None else None
                    page = f"{page_from}-{page_to}" if page_from and page_to else page_from or page_to
                    date_elem = monogr.find(f'tei:imprint/tei:date[@type="published"]', namespaces=ns)
                    date_published = date_elem.attrib.get('when') if date_elem is not None else None
                    doi = bibl_struct.findtext(f'tei:idno[@type="DOI"]', namespaces=ns)
                    note = bibl_struct.findtext(f'tei:note[@type="submission"]', namespaces=ns)

                    article_info = {
                        'issn': issn,
                        'eissn': eissn,
                        'publisher': publisher,
                        'volume': volume,
                        'issue': issue,
                        'page': page,
                        'date de publication': date_published,
                        'DOI': doi,
                        'Note':note
                        
                    }

    return {'information': article_info, 'authors': authors}
