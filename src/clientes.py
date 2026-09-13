clientes = []


def registrar_cliente(nombre, documento):
    if not nombre or not documento:
        raise ValueError("El nombre y el documento son obligatorios")

    for cliente in clientes:
        if cliente["documento"] == documento:
            raise ValueError("El documento ya está registrado")

    nuevo_cliente = {
        "nombre": nombre,
        "documento": documento
    }

    clientes.append(nuevo_cliente)
    return nuevo_cliente


def obtener_cliente(documento):
    for cliente in clientes:
        if cliente["documento"] == documento:
            return cliente
    return None


def listar_clientes():
    return clientes