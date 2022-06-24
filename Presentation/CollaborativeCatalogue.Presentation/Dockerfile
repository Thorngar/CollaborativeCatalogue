#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Presentation/CollaborativeCatalogue.Presentation/CollaborativeCatalogue.Presentation.csproj", "Presentation/CollaborativeCatalogue.Presentation/"]
RUN dotnet restore "Presentation/CollaborativeCatalogue.Presentation/CollaborativeCatalogue.Presentation.csproj"
COPY . .
WORKDIR "/src/Presentation/CollaborativeCatalogue.Presentation"
RUN dotnet build "CollaborativeCatalogue.Presentation.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CollaborativeCatalogue.Presentation.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CollaborativeCatalogue.Presentation.dll"]