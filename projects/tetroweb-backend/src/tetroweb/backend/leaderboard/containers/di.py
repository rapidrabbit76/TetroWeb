from dependency_injector import containers, providers

from tetroweb.backend.settings import Settings

from ..use_case import LeaderboardUseCase


class LeaderboardContainer(containers.DeclarativeContainer):
    settings = providers.Resource(Settings)
    use_case = providers.Singleton(LeaderboardUseCase)
