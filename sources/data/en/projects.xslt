<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  
  <xsl:template match="/groups/project">
    <div id="projects {@id}">
      <h3>
        <span>
          <xsl:value-of select="title"/>
        </span>
        <span>
          {{projects.version('<xsl:value-of select="@id"/>') }}
        </span>
      </h3>
      <h3 escape="on">
        <xsl:value-of select="note"/>
      </h3>
      <p escape="on">
        <xsl:value-of select="summary"/>
      </p>
      <p>
        <a class="icon link ext alt" href="#projects#{@id}">{{Messages['link.read.more']}}</a>
      </p> 
    </div>
  </xsl:template>

  <xsl:template match="/groups">
    <xsl:for-each select="/groups/project/group[not(. = ../following-sibling::project/group)]">
      <xsl:sort select="." order="ascending"/>
      <xsl:variable name="group" select="."/>
      <xsl:if test="not(starts-with($group, 'Experiment'))">
        <div>
          <h2>
            <xsl:value-of select="$group"/>
          </h2>
          <xsl:apply-templates select="/groups/project[group = $group]"/>
        </div>
      </xsl:if>
    </xsl:for-each>
    <xsl:for-each select="/groups/project/group[not(. = ../following-sibling::project/group)]">
      <xsl:sort select="." order="ascending"/>
      <xsl:variable name="group" select="."/>
      <xsl:if test="starts-with($group, 'Experiment')">
        <div>
          <h2>
            <xsl:value-of select="$group"/>
          </h2>
          <xsl:apply-templates select="/groups/project[group = $group]"/>
        </div>
      </xsl:if>
    </xsl:for-each>
  </xsl:template>

  <xsl:template match="/collection/projects">
    {{_projects:[]}}
    <xsl:for-each select="/collection/projects/project">
      {{_void:_projects.push('<xsl:value-of select="concat('xml://projects/', @id)"/>')}}
    </xsl:for-each>
    <div output="{{{{DataSource.transform(DataSource.collect('groups', _projects), 'xslt://projects')}}}}"/>
  </xsl:template>

  <xsl:template match="/projects">
    {{_lookup:SiteMap.lookup()}}
    {{_project:(_lookup.face.match(/#.*?#([^#]+)/) || [null, null])[1]}}
    {{_facet:_project ? _lookup.facet : null}}
    {{_title:_project ? Messages['projects.' + _project + '.title'] : Messages['projects.title']}}
    <header>
      <h1>{{_title}}</h1>
    </header>
    <article condition="{{{{not not _project}}}}"
        output="{{{{'xml://projects/' + _project}}}} xslt://project"/>
    <article condition="{{{{not _project}}}}"
        output="{{{{DataSource.transform(DataSource.collect('collection', ['xml://projects']), 'xslt://projects')}}}}"/>
  </xsl:template>
</xsl:stylesheet>