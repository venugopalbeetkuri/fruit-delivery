{{- define "fruit-delivery.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "fruit-delivery.fullname" -}}
{{-  := default .Chart.Name .Values.nameOverride -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name  | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}

{{- define "fruit-delivery.labels" -}}
app.kubernetes.io/name: {{ include "fruit-delivery.name" . }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "fruit-delivery.selectorLabels" -}}
app.kubernetes.io/name: {{ include "fruit-delivery.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- define "fruit-delivery.namespace" -}}
{{- default .Release.Namespace .Values.namespace.name -}}
{{- end -}}

{{- define "fruit-delivery.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
{{- default (include "fruit-delivery.fullname" .) .Values.serviceAccount.name -}}
{{- else -}}
{{- default "default" .Values.serviceAccount.name -}}
{{- end -}}
{{- end -}}
