from ..process.process_figure import process_figure
from ..process.process_table import process_table
from ..process.process_graphics import process_graphics
from ..space_name import ns

def convert_figures_and_tables(body):
    figures = body.findall('.//tei:figure', namespaces=ns)
    tables = body.findall('.//tei:figure[@type="table"]', namespaces=ns)

    all_figures = [process_figure(figure) for figure in figures]
    all_tables = [process_table(table) for table in tables]

    graphics = body.findall('.//tei:graphic', namespaces=ns)
    all_graphics = [process_graphics(graphic) for graphic in graphics]

    return {'Figures': all_figures, 'Tables': all_tables, 'Graphics': all_graphics}
