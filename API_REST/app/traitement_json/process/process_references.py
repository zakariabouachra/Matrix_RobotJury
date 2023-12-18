from ..space_name import ns

def process_references(references_section):
    references_info = {'references': []}

    if references_section is not None:
        bibliographies = references_section.findall('.//tei:biblStruct', namespaces=ns)

        for biblio in bibliographies:
            reference_info = {}

            title = biblio.find('.//tei:title[@type="main"]', namespaces=ns)
            if title is not None:
                reference_info['title'] = title.text

            authors = biblio.findall('.//tei:author/tei:persName/tei:surname', namespaces=ns)
            if authors:
                reference_info['authors'] = [author.text for author in authors]

            doi = biblio.find('.//tei:idno[@type="DOI"]', namespaces=ns)
            if doi is not None:
                reference_info['doi'] = doi.text

            journal_title = biblio.find('.//tei:monogr/tei:title[@type="j"]', namespaces=ns)
            if journal_title is not None:
                reference_info['journal_title'] = journal_title.text

            journal_abbreviation = biblio.find('.//tei:monogr/tei:title[@level="j"]', namespaces=ns)
            if journal_abbreviation is not None:
                reference_info['journal_abbreviation'] = journal_abbreviation.text

            issn = biblio.find('.//tei:monogr/tei:idno[@type="ISSN"]', namespaces=ns)
            if issn is not None:
                reference_info['issn'] = issn.text

            issue = biblio.find('.//tei:monogr/tei:biblScope[@unit="issue"]', namespaces=ns)
            if issue is not None:
                reference_info['issue'] = issue.text

            pages = biblio.find('.//tei:monogr/tei:biblScope[@unit="page"]', namespaces=ns)
            if pages is not None:
                reference_info['pages'] = {'from': pages.get('from'), 'to': pages.get('to')}

            date = biblio.find('.//tei:monogr/tei:date[@type="published"]', namespaces=ns)
            if date is not None:
                reference_info['published_date'] = date.get('when')

            publisher = biblio.find('.//tei:monogr/tei:imprint/tei:publisher', namespaces=ns)
            if publisher is not None:
                reference_info['publisher'] = publisher.text

            raw_reference = biblio.find('.//tei:note[@type="raw_reference"]', namespaces=ns)
            if raw_reference is not None:
                reference_info['raw_reference'] = raw_reference.text

            references_info['references'].append(reference_info)

    return references_info