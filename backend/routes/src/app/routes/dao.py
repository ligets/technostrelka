from src.app.routes.models import RouteModel
from src.base_dao import BaseDAO


class RouteDAO(BaseDAO[RouteModel, None, None]):
    model = RouteModel
